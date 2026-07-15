import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Lineup } from "@/components/sections/lineup";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhatsInside } from "@/components/sections/whats-inside";
import { WhyCards } from "@/components/sections/why-cards";
import { Gift } from "@/components/sections/gift";
import { ComingSoon } from "@/components/sections/coming-soon";
import { Founders } from "@/components/sections/founders";
import { Faq } from "@/components/sections/faq";
import { PreorderCta } from "@/components/sections/preorder-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Lineup />
      <HowItWorks />
      <WhatsInside />
      <WhyCards />
      <Gift />
      <ComingSoon />
      <Founders />
      <Faq />
      <PreorderCta />
    </>
  );
}
