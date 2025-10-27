import React, { useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import ContainerLayout from "@/Layouts/ContainerLayout";
import { ArrowRight } from "lucide-react";

// CN utility function for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleGetStarted = () => {
        router.get("/dashboard");
    };

    const features = [
        { title: "Unified Workspace", desc: "All projects in one hub." },
        { title: "Real-time Collaboration", desc: "Work together live." },
        { title: "Smart Automation", desc: "Automate your flow." },
        { title: "Insightful Analytics", desc: "Track what matters." },
    ];

    // Pre-calculate particle positions for better performance
    const particles = [...Array(20)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 12 + Math.random() * 8,
    }));

    return (
        <>
            <Head title="Onboarding" />
            <div className={cn(
                "min-h-screen flex py-2 justify-center items-center w-full overflow-x-hidden",
                "bg-gradient-to-br from-background via-background to-background/95 relative"
            )}>
                <ContainerLayout>
                    {/* Static background glow */}
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.25) 0%, transparent 60%)`,
                        }}
                    />

                    {/* Optimized floating particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((particle) => (
                            <div
                                key={particle.id}
                                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
                                style={{
                                    left: `${particle.left}%`,
                                    top: `${particle.top}%`,
                                    animationDelay: `${particle.delay}s`,
                                    animationDuration: `${particle.duration}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Background glows */}
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow pointer-events-none" />

                    <div
                        className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-glow pointer-events-none"
                        style={{ animationDelay: "1.5s" }}
                    />

                    {/* Main Content Container */}
                    <div className="relative z-10 h-full flex flex-col">

                        {/* Hero Section */}
                        <div
                            ref={heroRef}
                            className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 sm:px-8 py-8"
                        >
                            {/* Left Content */}
                            <div className="flex-1 max-w-2xl text-center lg:text-left relative">
                                <div className="absolute -top-20 -left-32 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

                                {/* Hero Text */}
                                <div
                                    className={cn(
                                        "transition-all duration-700 ease-out",
                                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    )}
                                >
                                    <p className="uppercase tracking-[4px] text-primary/80 font-semibold mb-4 text-sm">
                                        Empower your workflow
                                    </p>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
                                        The future of{" "}
                                        <span className="block relative mt-2">
                                            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-text">
                                                project management
                                            </span>
                                            <span className="absolute inset-x-0 -bottom-2 h-[4px] bg-gradient-to-r from-primary/50 via-accent/50 to-transparent rounded-full blur-sm" />
                                        </span>
                                    </h1>
                                </div>

                                {/* Description */}
                                <div
                                    className={cn(
                                        "mt-6 transition-all duration-700 delay-150 ease-out",
                                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    )}
                                >
                                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                                        Simplify your team's workflow with tools that bring clarity, automation, and speed so you can focus on what truly matters.
                                    </p>
                                </div>

                                {/* Features Grid */}
                                <div
                                    className={cn(
                                        "mt-8 transition-all duration-700 delay-300 ease-out",
                                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    )}
                                >
                                    <div className="grid grid-cols-1 xsm:grid-cols-2 lg:place-items-start place-items-center gap-4 mb-8">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    "flex items-start space-x-3 group py-3 rounded-xl transition-all duration-300 w-full px-3",
                                                    "xsm:px-0 xsm:bg-transparent bg-background/75"
                                                )}
                                            >
                                                <div className="flex-shrink-0 my-auto w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                    ✓
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground text-sm">{feature.title}</div>
                                                    <div className="text-xs text-start text-muted-foreground">{feature.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div
                                    className={cn(
                                        "transition-all duration-700 delay-450 ease-out",
                                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    )}
                                >
                                    <button
                                        onClick={handleGetStarted}
                                        className="group relative inline-flex items-center justify-center px-12 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full overflow-hidden shadow-lg hover:shadow-primary/40 transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer"
                                    >
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <span>Launch Dashboard</span>
                                            <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform duration-200" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-80 blur-2xl animate-button-glow" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Dashboard Preview */}
                            <div className="flex-1 w-full max-w-md xsm:block hidden lg:max-w-lg">
                                <div
                                    className={cn(
                                        "transition-all duration-700 delay-600 ease-out",
                                        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
                                    )}
                                >
                                    <div className="relative bg-white/70 dark:bg-muted/40 backdrop-blur-xl border border-border/60 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                                        {/* Browser header */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex space-x-2">
                                                <div className="w-3 h-3 bg-red-400 rounded-full" />
                                                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                                <div className="w-3 h-3 bg-green-400 rounded-full" />
                                            </div>
                                            <div className="text-sm text-muted-foreground font-medium px-3 py-1 rounded-full bg-background/50">
                                                Project Dashboard
                                            </div>
                                        </div>

                                        {/* Cards Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <div
                                                    key={i}
                                                    className="bg-background/60 rounded-2xl p-3 border border-border/50 hover:border-primary/60 hover:bg-background/80 transition-all duration-300 group hover:scale-105 cursor-pointer"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="w-10 h-2 bg-muted rounded-full group-hover:bg-primary/30 transition-colors duration-300" />
                                                        <div className="w-4 h-4 bg-accent/40 rounded group-hover:bg-accent/60 transition-colors duration-300" />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="w-full h-1.5 bg-muted/70 rounded-full group-hover:bg-primary/20 transition-colors duration-300" />
                                                        <div className="w-2/3 h-1.5 bg-muted/50 rounded-full group-hover:bg-primary/20 transition-colors duration-300" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Task List */}
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center space-x-3 group hover:scale-[1.02] transition-all duration-200 cursor-pointer p-2 rounded-lg hover:bg-background/50"
                                                >
                                                    <div className="w-4 h-4 border-2 border-muted rounded group-hover:border-primary/60 transition-colors duration-300 flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="w-32 h-2 bg-muted rounded-full mb-1 group-hover:bg-primary/30 transition-colors duration-300" />
                                                        <div className="w-24 h-1.5 bg-muted/50 rounded-full group-hover:bg-primary/20 transition-colors duration-300" />
                                                    </div>
                                                    <div className="w-8 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                        <div className="w-5 h-1.5 bg-primary rounded-full" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Glow corners */}
                                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-3xl group-hover:w-8 group-hover:h-8 transition-all duration-300" />
                                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent rounded-bl-3xl group-hover:w-8 group-hover:h-8 transition-all duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optimized Animations */}
                    <style jsx>{`
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 0.7;
                        }
                        50% {
                            transform: translateY(-20px) rotate(180deg);
                            opacity: 1;
                        }
                    }
                    @keyframes glow {
                        0%, 100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                        50% {
                            opacity: 0.85;
                            transform: scale(1.05);
                        }
                    }
                    @keyframes button-glow {
                        0%, 100% {
                            opacity: 0.8;
                            transform: scale(1);
                        }
                        50% {
                            opacity: 1;
                            transform: scale(1.05);
                        }
                    }
                    @keyframes gradient-text {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }
                    .animate-float {
                        animation: float 12s ease-in-out infinite;
                    }
                    .animate-glow {
                        animation: glow 5s ease-in-out infinite;
                    }
                    .animate-button-glow {
                        animation: button-glow 3s ease-in-out infinite;
                    }
                    .animate-gradient-text {
                        background-size: 200% 200%;
                        animation: gradient-text 5s ease infinite;
                    }
                `}</style>
                </ContainerLayout>
            </div>
        </>
    );
};

export default Home;