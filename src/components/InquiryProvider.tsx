"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { trackEvent } from "../lib/analytics";
import { emptyInquiry, submitInquiry, type InquiryDraft } from "../lib/inquiry";
import { createInquirySubmission, type InquirySubmissionState } from "../lib/inquiry-submission";

export type InquiryItem = {
  sku: string;
  name: string;
  category: string;
  variant?: string;
};

type InquiryContextValue = {
  draft: InquiryDraft;
  updateDraft: (change: Partial<InquiryDraft>) => void;
  submission: InquirySubmissionState;
  sendInquiry: ReturnType<typeof createInquirySubmission>["submit"];
  startNewInquiry: () => void;
  items: InquiryItem[];
  isOpen: boolean;
  addItem: (item: InquiryItem) => void;
  removeItem: (sku: string) => void;
  clearItems: () => void;
  openInquiry: () => void;
  closeInquiry: () => void;
};

const STORAGE_KEY = "anwellup-rfq-v2";
const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [draft, setDraft] = useState<InquiryDraft>({ ...emptyInquiry });
  const [sender] = useState(() => createInquirySubmission(submitInquiry, (accepted, location, itemCount) => {
    if (accepted) trackEvent("generate_lead", { method: "website_form", location, item_count: itemCount });
    else trackEvent("inquiry_submit_error", { location });
  }));
  const submission = useSyncExternalStore(sender.subscribe, sender.getSnapshot, sender.getServerSnapshot);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter((item): item is InquiryItem =>
          !!item && typeof item === "object" && typeof item.sku === "string" &&
          typeof item.name === "string" && typeof item.category === "string"
        ));
      }
    } catch {
      // Enquiries still work when browser storage is unavailable.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* Session-only selection. */ }
  }, [items, storageReady]);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  const value = useMemo<InquiryContextValue>(() => ({
    draft,
    updateDraft: change => { if (!sender.locked()) setDraft(current => ({ ...current, ...change })); },
    submission,
    sendInquiry: sender.submit,
    startNewInquiry: () => {
      if (!sender.reset()) return;
      setDraft({ ...emptyInquiry });
      setItems([]);
    },
    items,
    isOpen,
    addItem: (item) => {
      if (sender.locked()) { setIsOpen(true); return; }
      setItems((current) => {
        if (current.some((entry) => entry.sku === item.sku)) return current;
        trackEvent("add_to_inquiry", { sku: item.sku, category: item.category });
        return [...current, item];
      });
      setIsOpen(true);
    },
    removeItem: (sku) => { if (!sender.locked()) setItems((current) => {
      trackEvent("remove_from_inquiry", { sku });
      return current.filter((item) => item.sku !== sku);
    }); },
    clearItems: () => {
      if (sender.locked()) return;
      trackEvent("inquiry_clear", { item_count: items.length });
      setItems([]);
    },
    openInquiry: () => {
      trackEvent("inquiry_open", { item_count: items.length });
      setIsOpen(true);
    },
    closeInquiry: () => setIsOpen(false),
  }), [items, isOpen, draft, sender, submission]);

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const value = useContext(InquiryContext);
  if (!value) throw new Error("useInquiry must be used inside InquiryProvider");
  return value;
}

export function OpenInquiryButton({ className = "button button-dark", children = "Build an RFQ" }: { className?: string; children?: React.ReactNode }) {
  const { openInquiry } = useInquiry();
  return <button className={className} type="button" onClick={openInquiry} aria-haspopup="dialog">{children}</button>;
}

export function AddToInquiryButton({ item, compact = false, onAdd }: { item: InquiryItem; compact?: boolean; onAdd?: () => void }) {
  const { addItem, items } = useInquiry();
  const added = items.some((entry) => entry.sku === item.sku);
  return (
    <button className={compact ? "add-button add-button-compact" : "add-button"} type="button" onClick={() => { addItem(item); onAdd?.(); }} disabled={added} aria-pressed={added} aria-label={`${added ? "Added" : "Add"} ${item.name}${item.variant ? `, ${item.variant}` : ""}, ${item.sku}${added ? "" : " to enquiry"}`}>
      <span>{added ? "Added" : "Add to RFQ"}</span><span aria-hidden="true">{added ? "✓" : "+"}</span>
    </button>
  );
}
