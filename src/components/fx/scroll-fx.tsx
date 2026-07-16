"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Global motion controller: Lenis smooth scroll driven by the GSAP ticker,
// plus data-attribute scroll reveals so sections can stay server components.
// html.fx gates the pre-reveal hidden state — no JS (or reduced motion) = fully visible page.
export function ScrollFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      document.documentElement.classList.add("fx");

      // anchors:true = hash links smooth-scroll through the page, so scroll reveals
      // fire naturally instead of landing on un-revealed (invisible) sections.
      const lenis = new Lenis({ autoRaf: false, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const dir = el.dataset.reveal;
        const from: gsap.TweenVars = { autoAlpha: 0, y: 28 };
        if (dir === "left") Object.assign(from, { x: -40, y: 0 });
        if (dir === "right") Object.assign(from, { x: 40, y: 0 });
        gsap.fromTo(el, from, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: parseFloat(el.dataset.revealDelay ?? "0"),
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 80%", once: true },
          },
        );
      });

      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        document.documentElement.classList.remove("fx");
      };
    });
  });

  return null;
}
