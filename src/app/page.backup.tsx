import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Process from "@/components/home/Process";
import VideoSection from "@/components/home/VideoSection";
import Testimonials from "@/components/home/Testimonials";
import Achievements from "@/components/home/Achievements";
import Mission from "@/components/home/Mission";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Process />
      <VideoSection />
      <Testimonials />
      <Achievements />
      <Mission />
      <CTA />
      <Footer />
    </main>
  );
}
