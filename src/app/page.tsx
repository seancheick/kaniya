import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { BoxOpen } from "@/components/sections/box-open";
import { Lineup } from "@/components/sections/lineup";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhatsInside } from "@/components/sections/whats-inside";
import { WhyCards } from "@/components/sections/why-cards";
import { Gift } from "@/components/sections/gift";
import { VoteBoard } from "@/components/sections/vote-board";
import { Founders } from "@/components/sections/founders";
import { Faq } from "@/components/sections/faq";
import { PreorderCta } from "@/components/sections/preorder-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <BoxOpen />
      <Lineup />
      <HowItWorks />
      <WhatsInside />
      <WhyCards />
      <Gift />
      <VoteBoard />
      <Founders />
      <Faq />
      <PreorderCta />
    </>
  );
}
