"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "@phosphor-icons/react";
import type { CatalogCategory, ProductFamily } from "../catalog";
import { getSpecificationColumns } from "../lib/specification-columns";
import { AddToInquiryButton } from "./InquiryProvider";

export function ProductDetailDrawer({ family, category, onClose }: {
  family: ProductFamily | null;
  category: CatalogCategory | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!family) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = [...document.querySelectorAll<HTMLElement>(".site-header, #main-content, .site-footer, .whatsapp-float")];
    const states = new Map(background.map(element => [element, element.inert]));
    states.forEach((_, element) => { element.inert = true; });
    document.body.classList.add("product-drawer-open");
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const controls = [...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("product-drawer-open");
      states.forEach((inert, element) => { element.inert = inert; });
      if (previousFocus?.isConnected && !previousFocus.matches(":disabled")) previousFocus.focus();
    };
  }, [family?.id]);

  if (!mounted || !family || !category) return null;
  const columns = getSpecificationColumns(family.variants);
  const href = `/products/${category.slug}/${family.id}/`;

  return createPortal(<div className="product-drawer-layer" role="presentation">
    <button className="product-drawer-backdrop" type="button" tabIndex={-1} onClick={onClose} aria-label="Close product details" />
    <aside className="product-drawer" ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="product-drawer-title">
      <header className="product-drawer-heading">
        <div><span>{category.label}</span><h2 id="product-drawer-title">{family.name}</h2><code>{family.sku}</code></div>
        <button type="button" onClick={onClose} aria-label="Close product details"><X size={24} /></button>
      </header>
      <div className="product-drawer-content">
        <figure className={category.id === "bags" ? "product-drawer-image category-source-master" : "product-drawer-image"}>
          <img src={family.image} alt={`${family.name} range illustration`} width={category.id === "bags" ? 640 : 1448} height={category.id === "bags" ? 480 : 1086} decoding="async" />
        </figure>
        <p className="product-drawer-summary">{family.summary}</p>
        <dl className="product-drawer-attributes">
          <div><dt>Materials</dt><dd>{family.materials.join(", ")}</dd></div>
          <div><dt>Applications</dt><dd>{family.applications.join(", ")}</dd></div>
        </dl>
        <section className="product-drawer-models" aria-labelledby="product-drawer-models-title">
          <header><h3 id="product-drawer-models-title">Available formats</h3><span>{family.variants.length} {family.variants.length === 1 ? "option" : "options"}</span></header>
          <ol>
            {family.variants.map(variant => <li key={variant.sku}>
              <div><code>{variant.sku}</code><strong>{variant.label}</strong><small>{columns.map(column => variant[column.field]).filter(Boolean).join(" · ") || "Specification on request"}</small></div>
              <AddToInquiryButton compact onAdd={onClose} item={{ sku: variant.sku, name: family.name, variant: variant.label, category: category.label }} />
            </li>)}
          </ol>
        </section>
        <Link className="product-drawer-link" href={href} onClick={onClose}>Open full specifications <ArrowRight size={18} /></Link>
      </div>
    </aside>
  </div>, document.body);
}
