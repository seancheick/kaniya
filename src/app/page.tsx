import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Marquee } from "@/components/sections/marquee";
import { OurBoxes } from "@/components/sections/our-boxes";
import { SocialProof } from "@/components/sections/social-proof";
import { Standards } from "@/components/sections/standards";
import { BoxOpen } from "@/components/sections/box-open";
import { WhatsInside } from "@/components/sections/whats-inside";
import { WhyCards } from "@/components/sections/why-cards";
import { PharmaGuideBlock } from "@/components/sections/pharmaguide";
import { Gift } from "@/components/sections/gift";
import { Founders } from "@/components/sections/founders";
import { Faq } from "@/components/sections/faq";
import { PreorderCta } from "@/components/sections/preorder-cta";
import { StickyBuyBar } from "@/components/sticky-buy-bar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Marquee />
      <OurBoxes />
      <SocialProof />
      <Standards />
      <BoxOpen />
      <WhatsInside />
      <WhyCards />
      <PharmaGuideBlock />
      <Gift />
      <Founders />
      <Faq />
      <PreorderCta />
      <StickyBuyBar />
    </>
  );
}
