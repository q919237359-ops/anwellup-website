"use client";

import { useEffect, useRef } from "react";
import { galleryDistance, galleryProgress } from "../lib/gallery-motion";

export function ScrollMotion({ children, variant }: { children: React.ReactNode; variant: "home" | "manufacturing" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    const frame = requestAnimationFrame(() => {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled || !rootRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const root = rootRef.current;
        const media = gsap.matchMedia();
        const context = gsap.context(() => {}, root);
        dispose = () => { media.revert(); context.revert(); };
        context.add(() => {
          media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(".title-mask > span", { yPercent: 110, opacity: 0, duration: 1.25, stagger: .13, ease: "power4.out" });
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(item => {
              gsap.from(item, { y: 38, opacity: 0, duration: .95, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 92%", once: true } });
            });
          });
          media.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
            if (variant === "manufacturing") {
              gsap.fromTo(".manufacturing-hero-media > img", { scale: 1.02, yPercent: -2.5 }, { scale: 1.085, yPercent: 2.5, ease: "none", scrollTrigger: { trigger: ".manufacturing-hero", start: "top top+=78", end: "bottom top", scrub: .65 } });
              gsap.from(".manufacturing-facts > div", { y: 18, opacity: 0, duration: .8, stagger: .1, delay: .45, ease: "power3.out" });
              gsap.utils.toArray<HTMLElement>(".evidence-card").forEach((card, index) => {
                const picture = card.querySelector("img");
                if (!picture) return;
                gsap.fromTo(picture, { yPercent: index % 2 ? 3 : -3 }, { yPercent: index % 2 ? -3 : 3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .75 } });
              });
              return;
            }
            if (variant !== "home") return;
            gsap.from(".cinema-copy > p, .cinema-copy > a", { y: 24, opacity: 0, duration: .9, stagger: .15, delay: .45, ease: "power3.out" });
            gsap.to(".cinema-photo", { scale: 1.08, yPercent: 5, ease: "none", scrollTrigger: { trigger: ".cinema-hero", start: "top top", end: "bottom top", scrub: .65 } });
            gsap.fromTo(".texture-photo", { scale: 1.02 }, { scale: 1.14, yPercent: 4, ease: "none", scrollTrigger: { trigger: ".texture-story", start: "top bottom", end: "bottom top", scrub: .65 } });
            gsap.fromTo(".texture-words > span", { opacity: .25 }, { opacity: 1, stagger: .06, ease: "none", scrollTrigger: { trigger: ".texture-copy", start: "top 70%", end: "bottom 45%", scrub: .8 } });
            gsap.fromTo(".studio-image img", { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".brand-studio", start: "top bottom", end: "bottom top", scrub: .65 } });
          });
          media.add("(min-width: 1081px) and (min-height: 700px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
            if (variant !== "home") return;
            const section = root.querySelector<HTMLElement>(".collection-showcase");
            const track = root.querySelector<HTMLElement>(".collection-track");
            const rail = root.querySelector<HTMLElement>(".collection-rail");
            const progressBar = root.querySelector<HTMLElement>(".collection-progress > span");
            if (!section || !track || !rail || !progressBar) return;
            section.classList.add("is-pinned");
            try {
              // Read geometry only at setup/refresh, never in a scroll-frame callback.
              let distance = 0;
              let visibleWidth = 0;
              let headerHeight = 78;
              const measure = () => {
                const style = getComputedStyle(track);
                const gutters = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
                visibleWidth = track.clientWidth - gutters;
                distance = galleryDistance(rail.scrollWidth, track.clientWidth, gutters);
                headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 78;
              };
              track.scrollLeft = 0; // Clear native position only when switching into pinned mode.
              measure();
              const animation = gsap.timeline({ scrollTrigger: {
                trigger: section,
                start: () => `top top+=${headerHeight}`,
                end: () => `+=${distance + 300}`,
                pin: true, anticipatePin: 1, scrub: .45,
                invalidateOnRefresh: true, onRefreshInit: measure,
              } });
              animation.fromTo(rail, { x: 0 }, { x: () => -distance, duration: 1, ease: "none" }, 0);
              animation.fromTo(progressBar, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0);

              const seek = (offset: number) => {
                const trigger = animation.scrollTrigger;
                if (!trigger) return;
                const progress = galleryProgress(offset, distance);
                window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: "instant" });
                ScrollTrigger.update();
                trigger.getTween()?.progress(1);
              };
              const focusPanel = (event: FocusEvent) => {
                const panel = event.target instanceof Element ? event.target.closest<HTMLElement>(".collection-panel") : null;
                if (!panel) return;
                const bounds = panel.getBoundingClientRect();
                const viewport = track.getBoundingClientRect();
                // Tab remains usable for links outside the clipped rail.
                if (bounds.left < viewport.left || bounds.right > viewport.right) {
                  seek(panel.offsetLeft + panel.offsetWidth / 2 - visibleWidth / 2);
                }
              };
              const moveByKeyboard = (event: KeyboardEvent) => {
                if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                const direction = event.key === "ArrowRight" ? 1 : -1;
                seek(-Number(gsap.getProperty(rail, "x")) + visibleWidth * .75 * direction);
              };
              track.addEventListener("focusin", focusPanel);
              track.addEventListener("keydown", moveByKeyboard);
              return () => {
                track.removeEventListener("focusin", focusPanel);
                track.removeEventListener("keydown", moveByKeyboard);
                section.classList.remove("is-pinned");
                track.scrollLeft = 0;
              };
            } catch (error) {
              section.classList.remove("is-pinned");
              throw error;
            }
          });
        });
        // All story/gallery images reserve their geometry. Loading pixels does not
        // justify resetting every pin; fonts are the one delayed layout dependency.
        let refreshFrame = 0;
        let refreshPending = false;
        const refreshWhenIdle = () => {
          if (cancelled || !refreshPending || refreshFrame || ScrollTrigger.isScrolling()) return;
          refreshFrame = requestAnimationFrame(() => {
            refreshFrame = 0;
            if (cancelled || ScrollTrigger.isScrolling()) return;
            refreshPending = false;
            ScrollTrigger.refresh();
          });
        };
        ScrollTrigger.addEventListener("scrollEnd", refreshWhenIdle);

        // Warm the offscreen cards before pin entry; decoding must not trigger refresh.
        const gallery = root.querySelector(".collection-showcase");
        const warmGallery = "IntersectionObserver" in window && gallery ? new IntersectionObserver(entries => {
          if (!entries.some(entry => entry.isIntersecting)) return;
          warmGallery?.disconnect();
          // Decode one card at a time so several large uploads never compete for
          // the same frame immediately before the pinned sequence begins.
          void (async () => {
            for (const img of gallery.querySelectorAll("img")) {
              if (cancelled) return;
              img.loading = "eager";
              await img.decode().catch(() => {}); // A failed image must not disable scrolling.
            }
          })();
        }, { rootMargin: "800px 0px" }) : null;
        if (gallery) warmGallery?.observe(gallery);

        dispose = () => {
          cancelAnimationFrame(refreshFrame);
          ScrollTrigger.removeEventListener("scrollEnd", refreshWhenIdle);
          warmGallery?.disconnect();
          media.revert(); context.revert();
        };
        void document.fonts.ready.then(() => {
          if (cancelled) return;
          refreshPending = true;
          refreshWhenIdle();
        });
      }).catch(error => { dispose(); console.error("Motion unavailable; displaying the static page.", error); });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); dispose(); };
  }, [variant]);
  return <div className={`motion-scope motion-scope-${variant}`} ref={rootRef}>{children}</div>;
}
