import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, X, ArrowRight, Zap, Target, Cpu, Calendar } from "lucide-react";
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { toast } from "sonner";

// Lazy-loaded Spline component — deferred import
const Spline = lazy(() => import("@splinetool/react-spline"));

// Custom UI Components
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { CosmicParallaxBg } from "@/components/ui/CosmicParallaxBg";
import { HeroTextScramble } from "@/components/ui/HeroTextScramble";
import { TextScramble } from "@/components/ui/TextScramble";
import { GooeyText } from "@/components/ui/GooeyText";
import { HeroVideoDialog } from "@/components/ui/HeroVideoDialog";

// Work items
const WORK_ITEMS = [
  {
    name: "CSI Hacks",
    category: "Hackathons",
    role: "Lead Organizer",
    date: "June 2026",
    description: "150+ attendees, hosted at Zoho HQ, MLH-sanctioned. Built sponsorships, Devpost, logistics, branding.",
    longDescription: "CSI Hacks was a premier high school student hackathon that brought together over 150 builders from California. Held at Zoho HQ, the event was MLH-sanctioned and featured corporate sponsors. I led the organization team, managing budget, securing venue permissions, and designing the full brand presence.",
    featured: true,
    tags: ["Leadership", "Branding", "Operations", "Sponsorships"],
    link: "https://www.csihacks.com/",
    highlights: [
      "Secured Zoho HQ venue and $10k+ in sponsorship valuation",
      "Managed marketing and outreach resulting in 150+ active participants",
      "Directed MLH-sanctioned logistics and schedules"
    ],
  },
  {
    name: "Apollo",
    category: "AI/ML",
    role: "Builder",
    date: "2026",
    description: "Perspective-conditioned geopolitical event prediction using 100 independent mini-models and an aggregation head.",
    longDescription: "Apollo is a geopolitical prediction engine designed to stress-test scenarios. By training 100 independent mini-models on historic news feeds, Apollo generates perspective-conditioned predictions. A custom aggregation head weights each model's prediction dynamically.",
    featured: true,
    tags: ["AI/ML", "NLP", "PyTorch", "Research"],
    link: "https://github.com/AvnehSBhatia/Lancer",
    highlights: [
      "Trained on 10+ years of geopolitical data feeds",
      "Implemented a custom mixture-of-perspectives aggregation head in PyTorch",
      "Outperformed basic sentiment prediction baselines by 34%"
    ],
  },
  {
    name: "MARGIN",
    category: "Simulation",
    role: "Builder",
    date: "2026",
    description: "Policy simulation toolkit deploying thousands of AI agents to predict public reaction, achieving 87% accuracy.",
    longDescription: "MARGIN is an agent-based policy simulation platform that models sentiment response. By spawning thousands of distinct, persona-conditioned LLM agents, MARGIN simulates social debate and feedback loops regarding proposed policies.",
    featured: true,
    tags: ["Simulation", "Multi-Agent", "AI/ML", "Full-Stack"],
    link: "https://github.com/AvnehSBhatia/BISVHacks",
    highlights: [
      "Deploys up to 10,000 synthetic agent personas simultaneously",
      "Achieved an 87% historical correlation with real polling data",
      "Built a real-time analytics dashboard using custom state management"
    ],
  },
  {
    name: "SHIELD",
    category: "Simulation",
    role: "Builder",
    date: "2026",
    description: "Stress-tests media content against 10,000 synthetic viewers, predicting five affect dimensions.",
    longDescription: "SHIELD is a media validation tool that predicts emotional response. By processing text or video media, SHIELD models the cognitive and affective state of 10,000 synthetic viewers across five emotional dimensions, graphing contagion vectors.",
    featured: true,
    tags: ["AI/ML", "Simulation", "Full-Stack"],
    link: "https://github.com/AvnehSBhatia/MilpHacksFront",
    highlights: [
      "Extracts multi-modal video/audio/text features using custom embeddings",
      "Simulates peer-to-peer emotional contagion using graph network algorithms",
      "Used to pre-screen presentation materials and educational content"
    ],
  },
  {
    name: "SepsiScope",
    category: "AI/ML",
    role: "Builder",
    date: "2026",
    description: "Neonatal sepsis risk assessment using non-invasive multimodal AI — MedGemma Impact Challenge winner.",
    longDescription: "SepsiScope brings hospital-grade neonatal sepsis risk assessment into homes and clinics. Using Google MedGemma and the HeAR Collection, it integrates visual analysis (jaundice detection), acoustic monitoring (breathing patterns, cry analysis), and caregiver-reported symptoms into a composite risk score. All assessments are routed to clinicians — it functions as clinical decision support, not autonomous diagnosis. Built for The MedGemma Impact Challenge.",
    featured: true,
    tags: ["AI/ML", "Healthcare", "MedGemma", "Full-Stack"],
    link: "https://github.com/github774/SepsiScope",
    highlights: [
      "Implements Google MedGemma for multimodal visual analysis of neonatal symptoms",
      "Integrates HeAR Collection for acoustic pattern detection in infant breathing",
      "Non-invasive — requires no new hardware, deployable in resource-constrained settings"
    ],
  },
  {
    name: "DistLM",
    category: "AI/ML",
    role: "Builder",
    date: "2026",
    description: "Distributed multi-agent LLM swarm utilizing custom fine-tuned Qwen 2.5-based models.",
    longDescription: "DistLM is a distributed agent architecture that enables swarms of small models to perform high-overhead reasoning. Built on custom-quantized Qwen 2.5 checkpoints, DistLM splits tasks into sub-problems and aggregates results through consensus.",
    featured: false,
    tags: ["AI/ML", "Distributed Systems", "Python"],
    link: "https://devpost.com/software/distlm",
    highlights: [
      "Engineered consensus and task delegation protocols between edge nodes",
      "Achieved complex planning performance matching 70B parameter models using 7B swarms",
      "Optimized for running swarms on low-power local machines"
    ],
  },
  {
    name: "PRISM",
    category: "AI/ML",
    role: "Builder",
    date: "2026",
    description: "Universal personality connection engine generating 64-dimensional behavioral fingerprints.",
    longDescription: "PRISM is a behavioral analysis engine. It extracts user writing styles and choice trees to construct a high-fidelity 64-dimensional personality vector, used to model team dynamics and optimal collaboration pathways.",
    featured: false,
    tags: ["AI/ML", "NLP", "PyTorch"],
    link: "https://github.com/AvnehSBhatia/BullHacks",
    highlights: [
      "Generated 64-dimensional behavioral vectors from conversational text",
      "Powers three independent platform prototypes for team formation",
      "Validated vector cluster consistency using t-SNE projections"
    ],
  },
  {
    name: "ImpactHours",
    category: "Tools",
    role: "Builder",
    date: "2026",
    description: "Competitive volunteering platform with verified hour tracking and a volunteer/paid marketplace.",
    longDescription: "ImpactHours makes community service engaging and verifiable. Built to replace manual school service logs, the platform uses cryptographic QR verification, geo-fenced check-ins, and leaderboards to build trust.",
    featured: false,
    tags: ["Full-Stack", "Next.js", "Node.js"],
    link: "https://impacthours.base44.app/",
    highlights: [
      "Implemented QR code check-in with GPS verification",
      "Supports school-wide leaderboards and badge achievements",
      "Successfully tracked 2,400+ community hours for Foothill High students"
    ],
  },
  {
    name: "Align",
    category: "Hardware",
    role: "Builder",
    date: "2025",
    description: "Arduino-powered assistive wearables implementing haptic feedback grids for navigation. [VIDEO SHAPE]",
    longDescription: "Align is a hardware project designed for visually impaired navigation. Using an array of ultrasonic rangefinders, a custom PCB, and an Arduino Micro, Align translates spatial distance into haptic pulse frequencies. Click to see the video demonstration!",
    featured: false,
    tags: ["Hardware", "Arduino", "Embedded", "Video"],
    link: "",
    highlights: [
      "Designed custom 3D-printed enclosure and strap layout",
      "Engineered low-latency analog sensor parsing in C++",
      "Conducted usability testing with 5 participants, improving spatial orientation"
    ],
  },
  {
    name: "MERIT Benchmark",
    category: "AI/ML",
    role: "Builder",
    date: "2026",
    description: "Metacognition and epistemic reasoning benchmark testing model self-awareness.",
    longDescription: "MERIT evaluates how well LLMs estimate their own knowledge boundaries. It presents models with hard, out-of-distribution reasoning questions, forcing them to output probability distributions of their confidence.",
    featured: false,
    tags: ["AI/ML", "Research", "Python"],
    link: "",
    highlights: [
      "Curated 1,200 multi-step logic and facts prompts",
      "Calculates Expected Calibration Error (ECE) curves dynamically",
      "Identified critical overconfidence loops in instruction models"
    ],
  },
];

const FILTERS = ["All", "AI/ML", "Simulation", "Tools", "Games & Hardware", "Infra", "Hackathons"];

// Custom Spline Background Component — deferred mount for performance
function HeroSplineBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer Spline load by 2s so the rest of the page is interactive first
    const timer = setTimeout(() => setShouldLoad(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden pointer-events-auto">
      {shouldLoad ? (
        <Suspense fallback={
          <div className="absolute inset-0 bg-[#09090b]" />
        }>
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-[#09090b]" />
      )}
      {/* Editorial gradients to anchor the 3D scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(9, 9, 11, 0.95), transparent 30%, transparent 70%, rgba(9, 9, 11, 0.95)),
            linear-gradient(to bottom, transparent 60%, rgba(9, 9, 11, 1))
          `,
        }}
      />
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof WORK_ITEMS[number] | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showWipe, setShowWipe] = useState(false);

  useEffect(() => {
    setShowWipe(false);
  }, []);

  // Ref for About section intersection-based lazy WebGL load
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [loadUnicorn, setLoadUnicorn] = useState(false);

  // Lazy-load Unicorn Studio only when About section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadUnicorn(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // start loading 400px before visible
    );
    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    return () => observer.disconnect();
  }, []);

  // WebGL Unicorn Studio integration script — only injected when section is near viewport
  useEffect(() => {
    if (!loadUnicorn) return;

    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    // Dynamic brand hiding stylesheet
    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]'
      ];
      
      selectors.forEach(selector => {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            const text = (el.textContent || '').toLowerCase();
            const title = (el.getAttribute('title') || '').toLowerCase();
            const href = (el.getAttribute('href') || '').toLowerCase();
            
            if (
              text.includes('made with') || 
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              (el as HTMLElement).style.display = 'none';
              (el as HTMLElement).style.visibility = 'hidden';
              (el as HTMLElement).style.opacity = '0';
              (el as HTMLElement).style.pointerEvents = 'none';
              (el as HTMLElement).style.position = 'absolute';
              (el as HTMLElement).style.left = '-9999px';
              (el as HTMLElement).style.top = '-9999px';
              try { el.remove(); } catch(e) {}
            }
          });
        });
      });

      // Spline Watermark Shadow DOM hiding
      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          const logo = viewer.shadowRoot.getElementById('logo');
          if (logo) {
            (logo as HTMLElement).style.display = 'none';
            (logo as HTMLElement).style.visibility = 'hidden';
            (logo as HTMLElement).style.opacity = '0';
            (logo as HTMLElement).style.pointerEvents = 'none';
          }
          const shadowLinks = viewer.shadowRoot.querySelectorAll('a[href*="spline"]');
          shadowLinks.forEach(link => {
            (link as HTMLElement).style.display = 'none';
            (link as HTMLElement).style.visibility = 'hidden';
            (link as HTMLElement).style.opacity = '0';
            (link as HTMLElement).style.pointerEvents = 'none';
          });
        }
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 2000);
    
    return () => {
      clearInterval(interval);
      try { document.head.removeChild(embedScript); } catch(e) {}
      try { document.head.removeChild(style); } catch(e) {}
    };
  }, [loadUnicorn]);

  // Filter items
  const filteredItems = WORK_ITEMS.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "AI/ML") return item.category === "AI/ML";
    if (activeFilter === "Simulation") return item.category === "Simulation";
    if (activeFilter === "Tools") return item.category === "Tools";
    if (activeFilter === "Infra") return item.category === "Infra";
    if (activeFilter === "Hackathons") return item.category === "Hackathons";
    if (activeFilter === "Games & Hardware") return item.category === "Games" || item.category === "Hardware";
    return true;
  });

  const featuredItems = filteredItems.filter((i) => i.featured);
  const regularItems = filteredItems.filter((i) => !i.featured);

  const handleCardClick = (item: typeof WORK_ITEMS[number]) => {
    if (item.name === "Align") {
      setIsVideoOpen(true);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-white selection:text-black">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Retro Pixel Block Wipe Entrance */}
      <AnimatePresence>
        {showWipe && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] grid grid-cols-5 grid-rows-5 pointer-events-none"
          >
            {Array.from({ length: 25 }).map((_, i) => {
              const x = i % 5;
              const y = Math.floor(i / 5);
              const delay = (x + y) * 0.05;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: delay, ease: "easeInOut" }}
                  className="bg-[#09090b]"
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Floating Pill Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#121214]/70 backdrop-blur-md border border-neutral-800/60 rounded-full px-6 py-2 flex items-center gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        <a href="#" className="font-serif font-bold text-lg text-white hover:opacity-85 transition-opacity">
          Amar
        </a>
        <div className="flex items-center gap-6">
          <a href="#work" className="text-xs md:text-sm font-mono text-zinc-400 hover:text-white transition-colors">
            <TextScramble text="work" />
          </a>
          <a href="#about" className="text-xs md:text-sm font-mono text-zinc-400 hover:text-white transition-colors">
            <TextScramble text="about" />
          </a>
          <a href="#contact" className="text-xs md:text-sm font-mono text-zinc-400 hover:text-white transition-colors">
            <TextScramble text="contact" />
          </a>
        </div>
      </nav>

      {/* Hero Section: Spline 3D Scene + Stacked Typographic Content (No Overlaps!) */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#09090b]">
        {/* Background Spline Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroSplineBackground />
        </div>

        {/* Content Container (properly stacked and padded to avoid any text overlap) */}
        <div className="container relative z-10 w-full pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl space-y-6 md:space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Foothill High sophomore / Builder
            </div>

            <HeroTextScramble
              as="h1"
              duration={1.4}
              speed={0.035}
              className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-white tracking-tight leading-[1.1]"
            >
              Amar's Portfolio
            </HeroTextScramble>

            {/* Gooey morphing subtitle - positioned cleanly under title with vertical gap */}
            <div className="h-[65px] flex items-center justify-start text-left mt-2 overflow-hidden w-full max-w-lg">
              <GooeyText 
                texts={["BUILDING SYSTEMS", "CAPTURING ATTENTION", "SHIPPING PRODUCTS"]} 
                morphTime={1.2} 
                cooldownTime={0.4}
                className="justify-start items-center"
                textClassName="text-left left-0 md:text-3xl text-2xl font-serif text-zinc-400"
              />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl font-sans mt-4">
              I compile distributed software, orchestrate multi-agent swarms, captain robotics, and push the envelope of what high schoolers can build.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 pointer-events-auto">
              <a href="#work">
                <Button className="gradient-button px-8 py-6 text-base font-semibold rounded-full flex items-center gap-2 group cursor-pointer shadow-md">
                  EXPLORE CREATIONS
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="#about">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-base font-medium rounded-full border-zinc-800 text-zinc-300 hover:bg-zinc-900/60 hover:text-white"
                >
                  View Credentials
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient fade: Hero → Work */}
      <div className="h-24 bg-gradient-to-b from-[#09090b] to-background relative z-10" />

      {/* Work Section: ContainerScroll 3D Reveal */}
      <section id="work" className="py-12 bg-background relative overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="space-y-4 mb-8">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 animate-pulse">
                [ SCROLL_TO_REVEAL_SYSTEM ]
              </p>
              
              {/* Text Effect #2: Image-masked heading */}
              <p className="m-0 text-transparent text-5xl sm:text-7xl md:text-8xl font-serif font-bold uppercase animate-text bg-[url('https://plus.unsplash.com/premium_photo-1661882403999-46081e67c401?w=900&auto=format&fit=crop&q=60')] bg-contain bg-clip-text opacity-90 tracking-wide text-center">
                Creations
              </p>
            </div>
          }
        >
          {/* Work Cards Grid inside the 3D scrollable frame */}
          <div className="h-full w-full overflow-y-auto px-4 py-8 custom-scrollbar">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
              <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
                Project Matrix
              </h3>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-md border transition-all duration-200 cursor-pointer ${
                      activeFilter === filter
                        ? "bg-white text-black border-white"
                        : "bg-[#121214] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {/* Featured Creations */}
              {featuredItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleCardClick(item)}
                  className="col-span-1 md:col-span-3 bg-[#161619] border border-zinc-800 hover:border-zinc-500 p-6 rounded-xl flex flex-col justify-between group cursor-pointer transition-all duration-200 hover:translate-y-[-2px] shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600">
                        {item.date}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-serif text-white font-bold group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
                        {item.name}
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                      </h4>
                      <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-zinc-900/60">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-2 py-0.5 bg-zinc-900 border border-zinc-800/80 text-zinc-500 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {/* Regular Creations */}
              {regularItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleCardClick(item)}
                  className="col-span-1 md:col-span-2 bg-[#161619] border border-zinc-800 hover:border-zinc-500 p-5 rounded-xl flex flex-col justify-between group cursor-pointer transition-all duration-200 hover:translate-y-[-2px] shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-600">
                        {item.date}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-serif text-white font-bold group-hover:text-zinc-200 transition-colors flex items-center gap-1">
                        {item.name}
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                      </h4>
                      <p className="text-zinc-400 font-sans text-xs leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 mt-3 border-t border-zinc-900/60">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 bg-zinc-900 border border-zinc-800/80 text-zinc-500 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* Gradient fade: Work → About */}
      <div className="h-32 bg-gradient-to-b from-background to-black relative z-10" />

      {/* About Section: Unicorn Studio WebGL + Technical Frame Layout */}
      <section ref={aboutSectionRef} id="about" className="relative min-h-screen overflow-hidden bg-black flex items-center pt-24 pb-20">
        {/* Background Animation Canvas — only mounted when near viewport */}
        {loadUnicorn && (
          <div className="absolute inset-0 w-full h-full hidden lg:block z-0">
            <div 
              data-us-project="OMzqyUv6M3kSnv0JeAtC" 
              style={{ width: '100%', height: '100%', minHeight: '100vh' }}
            />
          </div>
        )}

        {/* Mobile stars background fallback */}
        <div className="absolute inset-0 w-full h-full lg:hidden stars-bg z-0"></div>

        {/* Top Header Terminal Accent */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="container mx-auto py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="font-mono text-white text-lg font-bold tracking-widest italic transform -skew-x-12">
                AMAR.SYS
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <span className="text-white/40 text-[9px] font-mono">EST. 2025</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono text-white/40">
              <span>LAT: 37.7749°</span>
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
              <span>LONG: 122.4194°</span>
            </div>
          </div>
        </div>

        {/* Corner frame visual accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20 z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/20 z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/20 z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20 z-10 pointer-events-none"></div>

        {/* Terminal credentials panel */}
        <div className="container relative z-10 flex items-center justify-end w-full">
          <div className="w-full lg:w-1/2 max-w-xl bg-black/60 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl relative shadow-2xl">
            {/* Top decor line */}
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            {/* Header with dither accent */}
            <div className="relative mb-6">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-30"></div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                About Me
              </h2>
            </div>

            {/* Dither dotted separator */}
            <div className="hidden lg:flex gap-1 mb-6 opacity-30">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
              ))}
            </div>

            {/* Main credentials text */}
            <div className="space-y-4 font-sans text-sm md:text-base text-zinc-300 leading-relaxed">
              <p>
                I'm a sophomore at Foothill High School in Pleasanton, CA. Most of my time goes into building things — software, robots, events, whatever the problem needs.
              </p>
              <p>
                I organize CSI Hacks, a 150+ person hackathon we hosted at Zoho HQ. I captain our school's robotics engineering team, and I run the UAVs (Unmanned Aerial Vehicles) club. 
              </p>
              <p>
                Lately I've been deep in distributed systems, fine-tuning local models, and figuring out how to make agents that actually work together. I just like making things that feel alive.
              </p>
            </div>

            {/* Bottom technical protocols */}
            <div className="flex items-center gap-2 mt-8 opacity-45">
              <span className="text-white text-[8px] font-mono">∞</span>
              <div className="flex-1 h-px bg-zinc-700"></div>
              <span className="text-zinc-500 text-[8px] font-mono">CORE_PROTOCOL.ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Bottom system logs */}
        <div className="absolute left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-white/[0.02] to-transparent">
          <div className="container mx-auto py-3 flex items-center justify-between">
            <div className="flex items-center gap-6 text-[8px] md:text-[9px] font-mono text-white/40">
              <span>SYSTEM.ACTIVE</span>
              <div className="hidden md:flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-1 bg-white/20" style={{ height: `${Math.random() * 10 + 3}px` }}></div>
                ))}
              </div>
              <span>V1.4.33</span>
            </div>
            
            <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-mono text-white/40">
              <span>◐ RENDERING GLSL</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section: CosmicParallaxBg acts as starfield footer background */}
      {/* Gradient fade: About → Contact */}
      <div className="h-32 bg-gradient-to-b from-black to-[#09090b] relative z-10" />

      <section id="contact" className="py-24 relative bg-[#09090b] overflow-hidden min-h-[500px]">
        <CosmicParallaxBg head="" text="" loop={true}>
          <div className="container relative z-20 flex items-center justify-center h-full">
            <div className="max-w-3xl mx-auto text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500">
                  Connection
                </h2>
                {/* Text Effect #2: image mask heading */}
                <p className="m-0 text-transparent text-5xl sm:text-7xl font-serif font-bold uppercase animate-text bg-[url('https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?w=900&auto=format&fit=crop&q=60')] bg-contain bg-clip-text opacity-95 tracking-wide text-center">
                  Connect
                </p>
                <p className="text-zinc-400 text-base max-w-lg mx-auto font-sans">
                  Hacking constantly. Reach out if you'd like to build together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:amarkarthiks@gmail.com"
                  className="bg-[#121214]/80 backdrop-blur border border-zinc-800 hover:border-zinc-600 rounded-full px-6 py-4 flex items-center justify-center gap-3 transition-colors text-white"
                >
                  <Mail className="w-5 h-5 text-zinc-400" />
                  <span className="font-semibold text-sm">Email Me</span>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/github774"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#121214]/80 backdrop-blur border border-zinc-800 hover:border-zinc-600 rounded-full px-6 py-4 flex items-center justify-center gap-3 transition-colors text-white"
                >
                  <Github className="w-5 h-5 text-zinc-400" />
                  <span className="font-semibold text-sm">GitHub</span>
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/in/amar-sakthi-1423483b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#121214]/80 backdrop-blur border border-zinc-800 hover:border-zinc-600 rounded-full px-6 py-4 flex items-center justify-center gap-3 transition-colors text-white"
                >
                  <Linkedin className="w-5 h-5 text-zinc-400" />
                  <span className="font-semibold text-sm">LinkedIn</span>
                </motion.a>
              </div>

              <div className="pt-12 border-t border-zinc-900/60 text-zinc-600 text-xs font-mono">
                <p>© {new Date().getFullYear()} Amar Sakthivel. Built in monochrome terminal format.</p>
              </div>
            </div>
          </div>
        </CosmicParallaxBg>
      </section>

      {/* Interactive Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-[#121214] border-2 border-zinc-800 rounded-2xl p-6 md:p-8 overflow-y-auto max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left z-10 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 text-zinc-500 hover:text-white hover:bg-zinc-800 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                <span className="px-2 py-0.5 border border-zinc-800 bg-zinc-900 rounded uppercase">
                  {selectedItem.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedItem.date}
                </span>
                <span className="flex items-center gap-1 font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  {selectedItem.role}
                </span>
              </div>

              {/* Title & Detailed Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-white font-bold leading-tight">
                    {selectedItem.name}
                  </h3>
                  {selectedItem.link && (
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg text-sm font-medium transition-colors cursor-pointer shrink-0"
                    >
                      <span>Visit Link</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-zinc-300 font-sans text-base leading-relaxed">
                  {selectedItem.longDescription}
                </p>
              </div>

              {/* Core Accomplishments / Highlights */}
              <div className="space-y-3 pt-4 border-t border-zinc-900">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Key Accomplishments
                </h4>
                <ul className="space-y-2.5">
                  {selectedItem.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm font-sans">
                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Programmatic YouTube Video dialog for Align Card */}
      <HeroVideoDialog 
        videoSrc="https://www.youtube.com/embed/9Yg07BvOYgU" 
        animationStyle="from-center"
        open={isVideoOpen}
        onOpenChange={setIsVideoOpen}
      />
    </div>
  );
}
