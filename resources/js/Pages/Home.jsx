import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGetStarted = () => {
    router.get("/dashboard");
  };

  const features = [
    { title: "Real-time Collaboration", desc: "Work together seamlessly" },
    { title: "Smart Automation", desc: "Automate repetitive tasks" },
    { title: "Advanced Analytics", desc: "Make data-driven decisions" },
    { title: "Custom Workflows", desc: "Tailor to your team's needs" },
  ];

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-background/95 relative">
      {/* Mouse glow effect */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59,130,246,0.25) 0%, transparent 60%)`,
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Soft background glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow"></div>
      <div
        className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-glow"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navbar */}
        <nav className="pt-8 px-6 sm:px-8 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-3 h-3 bg-accent rounded-full group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-2xl font-bold text-foreground font-sans bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              FlowBoard
            </div>
          </div>
          <div className="text-sm text-muted-foreground font-medium px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
            For modern teams
          </div>
        </nav>

        {/* Main Content */}
        <div
          ref={heroRef}
          className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 sm:px-8 py-8"
        >
          {/* Left Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left relative">
            {/* Soft text background glow */}
            <div className="absolute -top-20 -left-32 w-96 h-96 bg-primary/5 blur-3xl rounded-full"></div>

            <div
              className={`transition-all duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <p className="uppercase tracking-[4px] text-primary/80 font-semibold mb-4 text-sm">
                Empower your workflow
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground font-sans">
                The future of{" "}
                <span className="block relative mt-2">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-text">
                    project management
                  </span>
                  <span className="absolute inset-x-0 -bottom-2 h-[4px] bg-gradient-to-r from-primary/50 via-accent/50 to-transparent rounded-full blur-sm"></span>
                </span>
              </h1>
            </div>

            <div
              className={`mt-6 transition-all duration-1000 delay-200 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <p className="text-base sm:text-lg text-muted-foreground font-sans leading-relaxed max-w-lg mx-auto lg:mx-0">
                Simplify your team's workflow with tools that bring clarity, automation, and speed — so you can focus
                on what really matters.
              </p>
            </div>

            {/* Features */}
            <div
              className={`mt-8 transition-all duration-1000 delay-400 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm group-hover:scale-110 transition-transform duration-300">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-1000 delay-600 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <button
                onClick={handleGetStarted}
                className="group relative inline-flex items-center justify-center px-12 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full overflow-hidden shadow-lg hover:shadow-primary/40 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Launch Dashboard</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-80 blur-2xl animate-button-glow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>

          {/* Right Content (Dashboard Preview) */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <div
              className={`transition-all duration-1000 delay-800 ease-out ${isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-10 opacity-0 scale-95"
                }`}
            >
              <div className="relative bg-white/70 dark:bg-muted/40 backdrop-blur-xl border border-border/60 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                {/* Browser header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium px-3 py-1 rounded-full bg-background/50">
                    Project Dashboard
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-background/60 rounded-2xl p-3 border border-border/50 hover:border-primary/60 hover:bg-background/80 transition-all duration-300 group hover:scale-105 cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="w-10 h-2 bg-muted rounded-full group-hover:bg-primary/30 transition-colors duration-300"></div>
                        <div className="w-4 h-4 bg-accent/40 rounded group-hover:bg-accent/60 transition-colors duration-300"></div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-full h-1.5 bg-muted/70 rounded-full group-hover:bg-primary/20 transition-colors duration-300"></div>
                        <div className="w-2/3 h-1.5 bg-muted/50 rounded-full group-hover:bg-primary/20 transition-colors duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 group hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-4 h-4 border-2 border-muted rounded group-hover:border-primary/60 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <div className="w-32 h-2 bg-muted rounded-full mb-1 group-hover:bg-primary/30 transition-colors duration-300"></div>
                        <div className="w-24 h-1.5 bg-muted/50 rounded-full group-hover:bg-primary/20 transition-colors duration-300"></div>
                      </div>
                      <div className="w-8 h-6 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <div className="w-5 h-1.5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Glow corners */}
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-3xl group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent rounded-bl-3xl group-hover:w-8 group-hover:h-8 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
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
    </div>
  );
};

export default Home;