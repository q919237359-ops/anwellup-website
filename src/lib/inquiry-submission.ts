import type { submitInquiry } from "./inquiry";

type Payload = Parameters<typeof submitInquiry>[0];
export type InquirySubmissionState = {
  status: "idle" | "sending" | "accepted" | "error";
  reference: string;
  error: string;
};
const initialState: InquirySubmissionState = { status: "idle", reference: "", error: "" };

// Owned by the site-wide provider, not by a form that disappears when a drawer
// closes or a client-side route changes. Nothing here is persisted to storage.
export function createInquirySubmission(
  send: typeof submitInquiry,
  onResult: (accepted: boolean, location: string, itemCount: number) => void,
) {
  let state = initialState;
  const listeners = new Set<() => void>();
  const publish = (next: InquirySubmissionState) => {
    state = next;
    listeners.forEach(listener => listener());
  };
  const locked = () => state.status === "sending" || state.status === "accepted";
  return {
    getSnapshot: () => state,
    getServerSnapshot: () => initialState,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    locked,
    reset: () => {
      if (state.status === "sending") return false;
      publish(initialState);
      return true;
    },
    async submit(payload: Payload, location: string) {
      // Synchronous guard also covers two different forms submitting in one tick.
      if (locked()) return;
      publish({ status: "sending", reference: "", error: "" });
      let accepted = false;
      try {
        const reference = await send(payload);
        accepted = true;
        publish({ status: "accepted", reference, error: "" });
      } catch (failure) {
        const timeout = failure instanceof Error && (failure.name === "TimeoutError" || failure.name === "AbortError");
        publish({ status: "error", reference: "", error: timeout
          ? "Confirmation timed out. Your enquiry may have been received; use email or WhatsApp to check before resending."
          : failure instanceof Error ? failure.message : "We could not confirm your enquiry. Your details are still here; use email or WhatsApp to check before resending." });
      }
      // Analytics failures must never turn an accepted enquiry into an error.
      try { onResult(accepted, location, payload.items.length); } catch { /* Measurement is best-effort. */ }
    },
  };
}
