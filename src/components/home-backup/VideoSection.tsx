
import { Play } from "lucide-react";
import Image from "next/image";

const VideoSection = () => {
    return (
        <section className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Content Side */}
            <div className="w-full lg:w-1/2 bg-primary p-12 lg:p-24 flex flex-col justify-center items-center text-center lg:items-start lg:text-left relative overflow-hidden">
                {/* Decorative Dots */}
                <div className="absolute top-10 right-10 opacity-30">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" fill="white" />
                        <circle cx="20" cy="2" r="2" fill="white" />
                        <circle cx="38" cy="2" r="2" fill="white" />
                        <circle cx="56" cy="2" r="2" fill="white" />
                        <circle cx="74" cy="2" r="2" fill="white" />
                        <circle cx="2" cy="20" r="2" fill="white" />
                        <circle cx="20" cy="20" r="2" fill="white" />
                        <circle cx="38" cy="20" r="2" fill="white" />
                        <circle cx="56" cy="20" r="2" fill="white" />
                        <circle cx="74" cy="20" r="2" fill="white" />
                        <circle cx="2" cy="38" r="2" fill="white" />
                        <circle cx="20" cy="38" r="2" fill="white" />
                        <circle cx="38" cy="38" r="2" fill="white" />
                        <circle cx="56" cy="38" r="2" fill="white" />
                        <circle cx="74" cy="38" r="2" fill="white" />
                        <circle cx="2" cy="56" r="2" fill="white" />
                        <circle cx="20" cy="56" r="2" fill="white" />
                        <circle cx="38" cy="56" r="2" fill="white" />
                        <circle cx="56" cy="56" r="2" fill="white" />
                        <circle cx="74" cy="56" r="2" fill="white" />
                    </svg>
                </div>

                {/* Background Circle Decoration */}
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-xl flex flex-col items-center lg:items-start">
                    <p className="text-xs lg:text-sm font-medium mb-4 lg:mb-6 text-white/80 uppercase tracking-wider">Watch Our Intro Video</p>
                    <h2 className="text-3xl lg:text-6xl font-bold mb-6 lg:mb-8 text-white leading-tight">
                        Learn More About<br />Passing An Account
                    </h2>
                    <p className="text-base lg:text-lg text-white/80 mb-8 lg:mb-10 leading-relaxed">
                        Get a full breakdown of how our service works — from registration to success.
                        Understand the process, our guarantees, and why traders around the world trust us to pass their accounts.
                    </p>
                    <button className="px-6 py-3 lg:px-8 lg:py-4 rounded-full border border-white hover:bg-white hover:text-primary transition-all duration-300 text-xs lg:text-sm font-bold text-white uppercase tracking-wide">
                        Check Video Channel
                    </button>
                </div>
            </div>

            {/* Right Image Side */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center relative min-h-[400px] lg:min-h-auto">
                <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-8">
                    <div className="relative w-full max-w-[300px] md:max-w-[400px] aspect-square rounded-3xl overflow-hidden">
                        <Image
                            src="/assets/video_bg_cropped.png"
                            alt="Video Thumbnail"
                            fill
                            className="object-cover scale-125 md:scale-100"
                        />

                        {/* Custom Ripple Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative flex items-center justify-center group cursor-pointer">
                                {/* Outer Ripple Circles */}
                                <div className="absolute w-24 h-24 bg-primary/10 rounded-full animate-ping opacity-75" />
                                <div className="absolute w-32 h-32 bg-primary/20 rounded-full" />
                                <div className="absolute w-24 h-24 bg-primary/40 rounded-full" />

                                {/* Main Button */}
                                <div className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
