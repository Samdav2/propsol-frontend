import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            {/* Hero Section */}
            <section className="pt-32 pb-0 md:pt-40 lg:pt-48 lg:pb-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden h-auto lg:h-[800px]">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                    {/* Right Side Bands (Behind Character) - Moved to bottom */}
                    {/* Top Band - Light Purple */}
                    <div className="absolute bottom-[25%] -right-[5%] w-[25%] h-[50px] -rotate-[8deg] z-0">
                        <div className="w-full h-full bg-purple-100/80" />
                    </div>
                    {/* Middle Band - Darker Purple */}
                    <div className="absolute bottom-[15%] -right-[5%] w-[30%] h-[60px] -rotate-[8deg] z-0">
                        <div className="w-full h-full bg-purple-200/80" />
                    </div>
                    {/* Bottom Band - Teal */}
                    <div className="absolute bottom-[5%] -right-[5%] w-[25%] h-[50px] -rotate-[8deg] z-0">
                        <div className="w-full h-full bg-cyan-200/80" />
                    </div>

                    {/* Left Side Band (Bottom) - Small wedge */}
                    <div className="absolute bottom-0 left-0 w-[20%] h-[60px] -rotate-[3deg] origin-bottom-left z-0 translate-y-4">
                        <div className="w-full h-full bg-cyan-200/60" />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10 h-full">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 h-full">
                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 pb-20 lg:pb-32 lg:text-left">
                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                                Support & Contact
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl lg:mx-0">
                                Have questions or need help with your account? Our team is here for you — before, during, and after your account-passing journey.
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="w-full lg:w-1/2 h-auto lg:h-full relative flex items-end justify-center lg:justify-end">
                            {/* Background decoration */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl -z-10" />

                            <Image
                                src="/assets/support_hero_image_b.png"
                                alt="Support Team"
                                width={800}
                                height={800}
                                className="relative z-10 object-contain object-bottom"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 relative">
                {/* Background decoration from design */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-bl-[100px] -z-10 hidden lg:block" />
                <div className="absolute bottom-0 left-20 w-32 h-32 flex gap-4 -z-10 opacity-20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>

                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Left Info */}
                        <div className="w-full lg:w-5/12 pt-10 text-center lg:text-left">
                            <span className="text-blue-600 font-semibold mb-2 block">Contact Us</span>
                            <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-8">
                                Get In Touch With Us
                            </h2>

                            <div className="space-y-8 flex flex-col items-center md:items-start">
                                <div className="hidden lg:flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-slate-900 mb-1">Email Support</h3>
                                        <p className="text-slate-600 text-sm mb-2">
                                            Our support specialists are ready to assist you with any inquiry.
                                        </p>
                                        <p className="text-slate-600 text-sm">
                                            <span className="font-medium">Email:</span> info@yourdomain.com
                                        </p>
                                        <p className="text-slate-600 text-sm mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-red-500" />
                                            Response Time: Within 12-24 hours on business days.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-slate-900 mb-1">Phone Number</h3>
                                        <p className="text-slate-600 text-sm">
                                            (+62)81 414 257 9980
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                                        <Mail className="w-5 h-5 lg:w-6 lg:h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-slate-900 mb-1">Email Address</h3>
                                        <p className="text-slate-600 text-sm">
                                            info@yourdomain.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="w-full lg:w-7/12 relative lg:pr-10">
                            {/* Decorative Elements for Form */}
                            {/* Blue Shape Top Right - Quarter Circle */}
                            <div className="absolute -top-10 right-0 w-32 h-32 bg-blue-600 rounded-tr-full z-0 hidden lg:block" />

                            {/* Dots Pattern Top Right (Below Blue Shape) */}
                            <div className="absolute top-24 right-0 flex gap-1.5 z-0 hidden lg:flex">
                                {/* Column 1 */}
                                <div className="flex flex-col gap-2">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={`col1-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                    ))}
                                </div>
                                {/* Column 2 */}
                                <div className="flex flex-col gap-2">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={`col2-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                    ))}
                                </div>

                                {/* Column 3 */}
                                <div className="flex flex-col gap-2">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={`col3-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                    ))}
                                </div>
                            </div>

                            {/* Dots Pattern Bottom Left - Double L Shape */}
                            <div className="absolute -bottom-6 -left-6 z-0">
                                {/* First L-Shape */}
                                <div className="absolute bottom-0 left-0">
                                    {/* Vertical Line */}
                                    <div className="absolute bottom-0 left-0 flex flex-col gap-2">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={`v1-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        ))}
                                    </div>
                                    {/* Horizontal Line */}
                                    <div className="absolute bottom-0 left-0 flex gap-2 pl-3">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={`h1-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        ))}
                                    </div>
                                </div>

                                {/* Second L-Shape (Offset) */}
                                <div className="absolute bottom-3 left-3">
                                    {/* Vertical Line */}
                                    <div className="absolute bottom-0 left-0 flex flex-col gap-2">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={`v2-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        ))}
                                    </div>
                                    {/* Horizontal Line */}
                                    <div className="absolute bottom-0 left-0 flex gap-2 pl-3">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={`h2-${i}`} className="w-1 h-1 bg-emerald-400 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-100 relative z-10">
                                <form className="space-y-6">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-6 py-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-600 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full px-6 py-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-600 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Your Phone"
                                            className="w-full px-6 py-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-600 placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            rows={4}
                                            placeholder="Your Message"
                                            className="w-full px-6 py-4 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-600 placeholder:text-slate-400 resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
