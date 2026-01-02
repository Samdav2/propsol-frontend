import Image from "next/image";

const features = [
    {
        iconPath: "/assets/feature_icon_1.png",
        title: "Guaranteed Account Passing within 30 Days",
        description: "We guarantee that your prop firm evaluation account will be passed within 30 days of submission.",
    },
    {
        iconPath: "/assets/feature_icon_2.png",
        title: "100% Refund Policy",
        description: "If we fail to pass your account within 30 days, you won't lose a dime.",
    },
    {
        iconPath: "/assets/feature_icon_3.png",
        title: "$100 Extra Compensation",
        description: "If your account is not passed successfully within the 30-day timeframe, we'll compensate you with an additional $100.",
    },
    {
        iconPath: "/assets/feature_icon_4.png",
        title: "Full Prop Firm Account Purchase Refund",
        description: "So, if we don't pass your account, we'll also refund the full amount you spent purchasing the prop firm account itself",
    },
    {
        iconPath: "/assets/feature_icon_5.png",
        title: "Access to Live Trading System",
        description: "After successfully passing your prop firm account, you'll get access to our live trading system.",
    },
    {
        iconPath: "/assets/feature_icon_6.png",
        title: "Expert Support Throughout",
        description: "Our dedicated support team and trading experts are available to guide you via:",
    },
];

const Features = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900">What we offer</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className={`w-16 h-16 mb-6 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <Image
                                    src={feature.iconPath}
                                    alt={feature.title}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
