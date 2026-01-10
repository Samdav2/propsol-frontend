import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroNew from "@/components/home/HeroNew";
import WhyTradersFail from "@/components/home/WhyTradersFail";
import WhatPropSolDoes from "@/components/home/WhatPropSolDoes";
import VerifiedAccounts from "@/components/home/VerifiedAccounts";
import ServiceForWho from "@/components/home/ServiceForWho";
import ChallengeTypes from "@/components/home/ChallengeTypes";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <Header />
      <HeroNew />
      <WhyTradersFail />
      <WhatPropSolDoes />
      <VerifiedAccounts />
      {/* <ServiceForWho /> */}
      <ChallengeTypes />

      <Footer />
    </main>
  );
}
