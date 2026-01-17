import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChallengeTypes from "@/components/home/ChallengeTypes";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[#e0eaf8]">
            <Header />
            {/* Add top padding to account for fixed header */}
            <div className="pt-20">
                <ChallengeTypes />
            </div>
            <Footer />
        </main>
    );
}
