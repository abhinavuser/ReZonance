"use client"

import { useEffect, useState, useRef } from "react"
import { Infinity, ArrowRight, Calendar, MapPin, Clock, Zap, Cpu, Wifi, CircuitBoard } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "tracks", label: "TRACKS" },
  { id: "prize", label: "PRIZE" },
  { id: "timeline", label: "TIMELINE" },
  { id: "organisers", label: "ORGANISERS" },
  { id: "sponsors", label: "SPONSORS" },
  { id: "contact", label: "CONTACT US" },
]

export default function RezonancePage() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const sections = ["hero", ...navItems.map((item) => item.id)]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Animated cursor */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                <Infinity className="h-10 w-10 text-blue-400 group-hover:text-purple-400 transition-all duration-500 group-hover:rotate-180" />
                <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <span className="text-white font-extralight text-2xl tracking-[0.2em]">HAVOLTZ</span>
            </div>

            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  className={`relative text-sm font-extralight tracking-[0.15em] transition-all duration-500 group ${
                    activeSection === item.id ? "text-blue-400" : "text-white/60 hover:text-white"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <div
                    className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${
                      activeSection === item.id
                        ? "w-full opacity-100"
                        : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32"
      >
        {/* Visible Animated Circuit Paths */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="path-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="path-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal flowing lines */}
            <path
              d="M0,200 Q300,150 600,200 T1200,200"
              stroke="url(#path-gradient-1)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,1000;1000,0;0,1000"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>

            <path
              d="M0,400 L200,400 L200,300 L400,300 L400,500 L800,500 L800,350 L1200,350"
              stroke="url(#path-gradient-2)"
              strokeWidth="2"
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,2000;2000,0;0,2000"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>

            <path d="M0,600 Q400,550 800,600 T1200,600" stroke="url(#path-gradient-1)" strokeWidth="2" fill="none">
              <animate
                attributeName="stroke-dasharray"
                values="0,1500;1500,0;0,1500"
                dur="5s"
                repeatCount="indefinite"
              />
            </path>

            {/* Vertical connecting lines */}
            <path
              d="M300,0 L300,200 M600,200 L600,400 M900,400 L900,800"
              stroke="#8b5cf6"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            >
              <animate attributeName="stroke-dasharray" values="0,800;800,0;0,800" dur="3s" repeatCount="indefinite" />
            </path>

            {/* Circuit nodes with pulsing animation */}
            <circle cx="300" cy="200" r="6" fill="#8b5cf6">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="400" r="6" fill="#3b82f6">
              <animate attributeName="r" values="4;8;4" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="350" r="6" fill="#06b6d4">
              <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Moving Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              animation: "grid-flow 15s linear infinite",
            }}
          />
        </div>

        {/* Enhanced Floating Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl animate-float" />
        <div className="absolute top-40 right-32 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl animate-float-delayed" />
        <div className="absolute bottom-32 left-40 w-48 h-48 bg-cyan-500/30 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-pink-500/30 rounded-full blur-2xl animate-float" />

        {/* Floating Interactive Particles */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-20 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-60"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-60"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-32 left-40 w-5 h-5 bg-cyan-500 rounded-full animate-bounce opacity-60"
            style={{ animationDelay: "2s", animationDuration: "2.5s" }}
          />
          <div
            className="absolute bottom-20 right-20 w-3 h-3 bg-pink-500 rounded-full animate-bounce opacity-60"
            style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
          />
          <div
            className="absolute top-60 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-bounce opacity-60"
            style={{ animationDelay: "1.5s", animationDuration: "2.8s" }}
          />
        </div>

        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          {/* Main Title with Advanced Animation */}
          <div className="relative mb-12">
            <div className="absolute inset-0 text-8xl md:text-9xl font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-sm">
              REZONANCE
            </div>

            <h1 className="relative text-8xl md:text-9xl font-thin tracking-tighter mb-8">
              <span className="inline-block animate-title-slide-in">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200">
                  REZ
                </span>
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-pulse">
                    O
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-xl opacity-50 animate-pulse" />
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-white">
                  NANCE
                </span>
              </span>
            </h1>

            {/* Animated Subtitle */}
            <div className="space-y-4 text-white/70 text-xl md:text-2xl font-extralight tracking-wide max-w-5xl mx-auto leading-relaxed animate-fade-in-up">
              <p className="animate-slide-in-left">GET READY FOR THE YEAR'S BIGGEST 24 HOUR HACKATHON</p>
              <p className="animate-slide-in-right">WHERE IDEAS SPARK, CIRCUITS CLICK AND INNOVATION NEVER SLEEPS</p>
            </div>
          </div>

          {/* Interactive CTA */}
          <div className="flex justify-center mb-20 animate-fade-in-up">
            <button
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-600/80 to-blue-600/80 backdrop-blur-sm rounded-full text-white font-extralight tracking-[0.1em] text-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25"
              onClick={() => scrollToSection("about")}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>JOIN THE RACE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>

          {/* Enhanced Event Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up">
            {[
              { icon: MapPin, title: "VENUE", info: "MG Auditorium", color: "from-blue-500 to-cyan-500" },
              { icon: Calendar, title: "DATE", info: "3rd & 4th Sept", color: "from-purple-500 to-pink-500" },
              { icon: Clock, title: "TIME", info: "8am to 12pm", color: "from-cyan-500 to-blue-500" },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />
                <item.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-125 group-hover:text-purple-400 transition-all duration-500" />
                <h3 className="text-white font-extralight text-xl mb-2 tracking-wide">{item.title}</h3>
                <p className="text-white/60 font-extralight">{item.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 border-y border-white/10 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-6xl md:text-8xl font-thin text-white/20 tracking-wider mx-8">INNOVATION</span>
          <span className="text-6xl md:text-8xl font-thin text-purple-400/40 tracking-wider mx-8">•</span>
          <span className="text-6xl md:text-8xl font-thin text-white/20 tracking-wider mx-8">TECHNOLOGY</span>
          <span className="text-6xl md:text-8xl font-thin text-blue-400/40 tracking-wider mx-8">•</span>
          <span className="text-6xl md:text-8xl font-thin text-white/20 tracking-wider mx-8">CREATIVITY</span>
          <span className="text-6xl md:text-8xl font-thin text-cyan-400/40 tracking-wider mx-8">•</span>
          <span className="text-6xl md:text-8xl font-thin text-white/20 tracking-wider mx-8">INNOVATION</span>
          <span className="text-6xl md:text-8xl font-thin text-purple-400/40 tracking-wider mx-8">•</span>
          <span className="text-6xl md:text-8xl font-thin text-white/20 tracking-wider mx-8">TECHNOLOGY</span>
          <span className="text-6xl md:text-8xl font-thin text-blue-400/40 tracking-wider mx-8">•</span>
        </div>
      </section>

      {/* About Section with Interactive Background */}
      <section id="about" className="py-40 px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Moving Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              animation: "grid-flow 20s linear infinite",
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div
            className="absolute top-32 left-32 w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-40"
            style={{ animationDelay: "0s", animationDuration: "4s" }}
          />
          <div
            className="absolute top-64 right-48 w-2 h-2 bg-purple-500 rounded-full animate-bounce opacity-40"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-48 left-64 w-4 h-4 bg-cyan-500 rounded-full animate-bounce opacity-40"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight animate-fade-in-up">About</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-12 animate-fade-in-up" />
            <p className="text-2xl md:text-3xl text-white/70 font-extralight leading-relaxed max-w-4xl mx-auto animate-fade-in-up">
              ReZonance is VIT Chennai's premier 24-hour hackathon focused on electronics and innovation. Join us for an
              electrifying experience where creativity meets technology.
            </p>
          </div>
        </div>
      </section>

      {/* Tracks Section with Enhanced Design */}
      <section id="tracks" className="py-40 px-8 relative overflow-hidden">
        {/* Animated Circuit Background */}
        <div className="absolute inset-0 opacity-15">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="tracks-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            <path
              d="M0,100 L300,100 L300,300 L600,300 L600,100 L1200,100"
              stroke="url(#tracks-gradient)"
              strokeWidth="2"
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,2000;2000,0;0,2000"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M0,500 Q400,400 800,500 T1200,500" stroke="url(#tracks-gradient)" strokeWidth="2" fill="none">
              <animate
                attributeName="stroke-dasharray"
                values="0,1500;1500,0;0,1500"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>

            <circle cx="300" cy="300" r="5" fill="#3b82f6">
              <animate attributeName="r" values="3;7;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="500" r="5" fill="#8b5cf6">
              <animate attributeName="r" values="3;7;3" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">Tracks</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-12" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: Cpu,
                title: "EMBEDDED SYSTEMS",
                desc: "Design and develop innovative embedded solutions that push the boundaries of hardware-software integration",
                color: "from-purple-500/20 to-purple-600/20",
                borderColor: "border-purple-500/30",
              },
              {
                icon: Wifi,
                title: "IoT",
                desc: "Create connected devices for the future, building the next generation of smart, interconnected systems",
                color: "from-blue-500/20 to-blue-600/20",
                borderColor: "border-blue-500/30",
              },
              {
                icon: CircuitBoard,
                title: "CIRCUIT DESIGN",
                desc: "Engineer cutting-edge electronic circuits that form the foundation of tomorrow's technology",
                color: "from-cyan-500/20 to-cyan-600/20",
                borderColor: "border-cyan-500/30",
              },
            ].map((track, index) => (
              <div
                key={track.title}
                className={`group relative bg-white/5 backdrop-blur-xl border ${track.borderColor} rounded-3xl p-12 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${track.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="relative z-10">
                  <track.icon className="w-12 h-12 text-white/60 mb-8 group-hover:text-white group-hover:scale-125 transition-all duration-500" />
                  <h3 className="text-3xl font-extralight text-white mb-6 tracking-wide">{track.title}</h3>
                  <p className="text-white/60 font-extralight leading-relaxed text-lg">{track.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Section */}
      <section id="prize" className="py-40 px-8 relative overflow-hidden">
        {/* Animated Prize Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-40 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Floating Prize Elements */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 left-20 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-40 right-32 w-4 h-4 bg-orange-400 rounded-full animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-32 left-40 w-5 h-5 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "2.5s" }}
          />
        </div>

        {/* Diagonal Lines Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255, 193, 7, 0.1) 50px, rgba(255, 193, 7, 0.1) 52px)`,
              animation: "diagonal-move 15s linear infinite",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">Prize Pool</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-12" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { place: "1st Place", amount: "₹50,000", color: "from-yellow-400 to-yellow-600", bg: "bg-yellow-500/10" },
              { place: "2nd Place", amount: "₹30,000", color: "from-gray-300 to-gray-500", bg: "bg-gray-500/10" },
              { place: "3rd Place", amount: "₹20,000", color: "from-orange-400 to-orange-600", bg: "bg-orange-500/10" },
            ].map((prize, index) => (
              <div
                key={prize.place}
                className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center hover:bg-white/10 transition-all duration-700 hover:scale-110 hover:shadow-2xl`}
              >
                <div
                  className={`absolute inset-0 ${prize.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="relative z-10">
                  <h3
                    className={`text-4xl font-extralight mb-6 text-transparent bg-clip-text bg-gradient-to-r ${prize.color} tracking-wide`}
                  >
                    {prize.place}
                  </h3>
                  <p className="text-5xl font-thin text-white">{prize.amount}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-xl text-white/60 font-extralight">
              Team sizes: 2-3 members (Rs. 300), 4 members (Rs. 500)
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-40 px-8 relative overflow-hidden">
        {/* Timeline Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform -translate-y-1/2" />
        </div>

        {/* Floating Timeline Elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-32 left-32 w-72 h-72 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Clock-like Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
              animation: "clock-rotate 30s linear infinite",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">Timeline</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-12" />
          </div>

          <div className="space-y-12">
            {[
              { title: "Registration Opens", date: "August 15th, 2024", color: "bg-blue-400", icon: Calendar },
              { title: "Hackathon Begins", date: "September 3rd, 8:00 AM", color: "bg-purple-400", icon: Zap },
              { title: "Final Presentations", date: "September 4th, 10:00 AM", color: "bg-pink-400", icon: ArrowRight },
            ].map((event, index) => (
              <div
                key={event.title}
                className="group flex items-center space-x-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center space-x-6">
                  <div
                    className={`w-6 h-6 ${event.color} rounded-full group-hover:scale-150 transition-transform duration-500`}
                  />
                  <event.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-extralight text-white mb-2 tracking-wide">{event.title}</h3>
                  <p className="text-white/60 font-extralight text-lg">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisers Section */}
      <section id="organisers" className="py-40 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">Organisers</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-12" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <h3 className="text-3xl font-extralight text-blue-400 mb-8 tracking-wide">FACULTY COORDINATORS</h3>
              <div className="space-y-4 text-white/70 font-extralight text-xl">
                <p>Dr. JAYAPRAKASH R</p>
                <p>Dr. SETHIL KUMAR</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <h3 className="text-3xl font-extralight text-purple-400 mb-8 tracking-wide">STUDENT COORDINATORS</h3>
              <div className="space-y-4 text-white/70 font-extralight text-xl">
                <p>TARUN PRABHAKAR</p>
                <p>JACOB SAM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-40 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">Sponsors</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-12" />
            <p className="text-2xl text-white/70 font-extralight">
              We're grateful to our sponsors who make ReZonance possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <h3 className="text-3xl font-extralight text-blue-400 mb-4 tracking-wide">VIT Chennai</h3>
              <p className="text-white/60 font-extralight text-lg">Main Organizer</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <h3 className="text-3xl font-extralight text-purple-400 mb-4 tracking-wide">Office of Student Welfare</h3>
              <p className="text-white/60 font-extralight text-lg">Supporting Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">Contact Us</h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-12" />
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center hover:bg-white/10 transition-all duration-500">
            <h3 className="text-3xl font-extralight text-blue-400 mb-12 tracking-wide">Get in Touch</h3>
            <div className="grid md:grid-cols-2 gap-8 text-white/70 font-extralight text-lg mb-12">
              <p>📧 Email: havoltz.vitcc@gmail.com</p>
              <p>📱 Instagram: @havoltz.vitcc</p>
              <p>🌐 Website: HaVoltz</p>
              <p>📍 VIT Chennai, Kelambakkam</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-full font-extralight tracking-wide text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25">
              Register Now
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
  @keyframes grid-flow {
    0% { transform: translate(0, 0); }
    100% { transform: translate(60px, 60px); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(180deg); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-40px) rotate(-180deg); }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-25px) rotate(90deg); }
  }
  
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  
  @keyframes title-slide-in {
    0% { opacity: 0; transform: translateY(50px) scale(0.9); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-in-left {
    0% { opacity: 0; transform: translateX(-50px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-right {
    0% { opacity: 0; transform: translateX(50px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
  .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
  .animate-marquee { animation: marquee 30s linear infinite; }
  .animate-title-slide-in { animation: title-slide-in 1.5s ease-out; }
  .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
  .animate-slide-in-left { animation: slide-in-left 1s ease-out 0.5s both; }
  .animate-slide-in-right { animation: slide-in-right 1s ease-out 0.7s both; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

  @keyframes diagonal-move {
    0% { transform: translateX(0); }
    100% { transform: translateX(100px); }
  }

  @keyframes clock-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes wave-move {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`}</style>
    </div>
  )
}
