import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            {/* Background Elements */}
            {/* Background Elements */}
            {/* Background Elements */}
            {/* Background Elements */}
            {/* Background Elements */}
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

            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
                    <div className="flex-1 max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-4 sm:mb-6">
                            Get Your Prop Firm Account Passed Within <span className="text-primary">30 Days</span>
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg leading-relaxed">
                            The process promises to pass your proprietary firm account within 30 days.
                        </p>

                        <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 w-full xs:w-auto">
                            <Link
                                href="/signup"
                                className="w-full xs:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 text-center whitespace-nowrap"
                            >
                                Get Started Now
                            </Link>
                            <button className="w-full xs:w-auto px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-primary flex items-center justify-center gap-2 hover:bg-primary/5 rounded-xl transition-colors whitespace-nowrap">
                                <Play className="w-5 h-5 fill-current" />
                                Watch Video
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 relative mt-12 lg:mt-0">
                        <div className="relative z-10 w-full max-w-[800px] mx-auto">
                            {/* Laptop Container */}
                            <div className="relative aspect-[16/10] w-full">
                                {/* Laptop Frame */}
                                <div className="relative z-20 w-full h-full">
                                    <Image
                                        src="/assets/laptop_frame.png"
                                        alt="Laptop Frame"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                {/* Screen Content - Positioned ON TOP of the frame */}
                                <div className="absolute top-[4%] left-[11%] right-[11%] bottom-[10%] z-30 overflow-hidden bg-black rounded-sm">
                                    <Image
                                        src="/assets/laptop_screen.png"
                                        alt="Trading Chart"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            {/* Star - Bottom Left */}
                            <div className="absolute -bottom-12 -left-8 lg:-left-16 w-32 h-32 lg:w-48 lg:h-48 z-30 animate-float">
                                <Image
                                    src="/assets/star.png"
                                    alt="3D Star"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* Coil - Top Right */}
                            <div className="absolute -top-12 -right-8 lg:-right-16 w-32 h-32 lg:w-48 lg:h-48 z-0 animate-float-delayed">
                                <Image
                                    src="/assets/coil.png"
                                    alt="3D Coil"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
