import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-grow relative flex items-center justify-center overflow-hidden py-20 lg:py-32">
                {/* Background Elements - Copied from Hero.tsx for consistency */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                    {/* Top Right Gradient Glow */}
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-300/20 blur-[120px] rounded-full z-0 pointer-events-none" />

                    {/* Left Side Bands */}
                    {/* Cyan Strip */}
                    <div className="absolute bottom-[15%] sm:bottom-[12%] lg:bottom-[2%] -left-[10%] sm:-left-[8%] lg:-left-[5%] w-[50%] sm:w-[45%] lg:w-[30%] h-[30px] sm:h-[40px] lg:h-[60px] -rotate-[6deg] z-0">
                        <div className="w-full h-full bg-gradient-to-r from-cyan-300 to-cyan-400 opacity-90" />
                    </div>
                    {/* Purple Strip (Faint, below Cyan) */}
                    <div className="absolute bottom-[10%] sm:bottom-[6%] lg:-bottom-[5%] -left-[10%] sm:-left-[8%] lg:-left-[5%] w-[40%] sm:w-[35%] lg:w-[25%] h-[40px] sm:h-[50px] lg:h-[80px] -rotate-[6deg] z-0">
                        <div className="w-full h-full bg-violet-100/50" />
                    </div>

                    {/* Right Side Bands */}
                    {/* Purple Strip */}
                    <div className="absolute bottom-[30%] sm:bottom-[32%] lg:bottom-[35%] -right-[10%] sm:-right-[8%] lg:-right-[5%] w-[40%] sm:w-[45%] lg:w-[40%] h-[60px] sm:h-[80px] lg:h-[100px] -rotate-[6deg] z-0">
                        <div className="w-full h-full bg-gradient-to-l from-violet-300 to-violet-200 opacity-80" />
                    </div>
                    {/* Cyan Strip (Faint, below Purple) */}
                    <div className="absolute bottom-[22%] sm:bottom-[24%] lg:bottom-[25%] -right-[10%] sm:-right-[8%] lg:-right-[5%] w-[35%] sm:w-[40%] lg:w-[35%] h-[40px] sm:h-[60px] lg:h-[80px] -rotate-[6deg] z-0">
                        <div className="w-full h-full bg-cyan-100/50" />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Page Not Found</h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
                        Oops! The page you are looking for does not exist. It might have been moved or deleted.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/25"
                    >
                        Go Back Home
                    </Link>
                </div>

                {/* Floating Elements */}
                {/* Star - Left */}
                <div className="absolute top-1/4 left-[10%] w-24 h-24 lg:w-32 lg:h-32 z-20 animate-float pointer-events-none opacity-80 lg:opacity-100">
                    <Image
                        src="/assets/star.png"
                        alt="Floating Star"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Coil - Right */}
                <div className="absolute bottom-1/4 right-[10%] w-24 h-24 lg:w-32 lg:h-32 z-20 animate-float-delayed pointer-events-none opacity-80 lg:opacity-100">
                    <Image
                        src="/assets/coil.png"
                        alt="Floating Coil"
                        fill
                        className="object-contain"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
