import Image from "next/image";

const steps = [
    {
        iconPath: "/assets/process_icon_1.png",
        title: "Register & Submit Your Details",
    },
    {
        title: "Make a Secure Payment",
    },
    {
        title: "Your Account Passed or Full Refund + compensation",
    },
    {
        title: "Access to our PropSol Trading System and Mentorship",
    },
];

const Process = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Here's the Process Involved</h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Dashed Line */}
                    <div className="hidden md:block absolute top-6 left-[12.5%] w-[75%] border-t-2 border-dashed border-slate-300" style={{ zIndex: 0 }} />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center relative">
                                {/* Icon/Circle Container - Fixed height to align with line */}
                                <div className="h-12 mb-6 w-full flex items-center justify-center relative" style={{ zIndex: 1 }}>
                                    <div className={`flex items-center justify-center bg-white ${index === 0 ? 'w-12 h-12' : 'w-6 h-6 rounded-full border-2 border-slate-300'}`}>
                                        {step.iconPath ? (
                                            <Image
                                                src={step.iconPath}
                                                alt={step.title}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <h3 className="text-sm font-semibold text-slate-900 max-w-[180px] leading-tight">{step.title}</h3>

                                {/* Mobile Vertical Connecting Line */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden h-16 border-l-2 border-dashed border-slate-300 my-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
