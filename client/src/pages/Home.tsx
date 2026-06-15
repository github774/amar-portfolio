import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const HACKATHONS = [
  {
    name: "CSI Hacks",
    date: "June 2026",
    role: "Lead Organizer",
    description: "150+ attendees, hosted at Zoho HQ, MLH-sanctioned. Built the full event from scratch: sponsorships, Devpost, logistics, branding.",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "LancerHacks",
    date: "2026",
    role: "Builder",
    description: "Built Apollo: a perspective-conditioned geopolitical event prediction system using 100 independent mini-models and a custom aggregation head.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "BISV Hacks",
    date: "2026",
    role: "Builder",
    description: "Built MARGIN: a policy simulation toolkit deploying thousands of AI agents to predict public reaction to policies, achieving 87% accuracy.",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Milpitas Hacks",
    date: "2026",
    role: "Builder",
    description: "Built SHIELD: stress-tests text or video content against 10,000 synthetic viewers, predicting five affect dimensions and simulating emotional contagion.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Bull Hacks",
    date: "2026",
    role: "Builder",
    description: "Built PRISM: a universal personality connection engine that generates 64-dimensional behavioral fingerprints and powers three distinct platforms.",
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "Los Altos Hacks",
    date: "April 2026",
    role: "Participant",
    description: "Exploring innovative solutions and networking with builders.",
    color: "from-cyan-500 to-purple-600",
  },
  {
    name: "Emerald Innovation Challenge",
    date: "2026",
    role: "Builder",
    description: "Built ImpactHours: a competitive volunteering platform with verified hour tracking, leaderboards, and a dual volunteer/paid services marketplace.",
    color: "from-green-500 to-emerald-600",
  },
];

const PROJECTS = [
  {
    name: "Apollo",
    description: "Perspective-conditioned geopolitical event prediction",
    tags: ["AI/ML", "NLP", "PyTorch", "Research"],
    category: "AI/ML",
  },
  {
    name: "MARGIN",
    description: "Policy simulation engine with thousands of AI agents predicting public reaction",
    tags: ["Simulation", "Multi-Agent", "AI/ML", "Full-Stack"],
    category: "Simulation",
  },
  {
    name: "SHIELD",
    description: "Stress-tests content against 10,000 synthetic viewers with affect predictions",
    tags: ["AI/ML", "Simulation", "Full-Stack"],
    category: "Simulation",
  },
  {
    name: "PRISM",
    description: "Universal personality connection engine with 64-dimensional behavioral fingerprints",
    tags: ["AI/ML", "NLP", "PyTorch"],
    category: "AI/ML",
  },
  {
    name: "ImpactHours",
    description: "Competitive volunteering platform with verified tracking and leaderboards",
    tags: ["Full-Stack", "Next.js", "Node.js"],
    category: "Tools",
  },
  {
    name: "Align",
    description: "Arduino-powered assistive wearables for accessibility",
    tags: ["Hardware", "Arduino", "Embedded"],
    category: "Hardware",
  },
  {
    name: "DistLM",
    description: "Distributed multi-agent LLM swarm with custom Qwen 2.5-based model",
    tags: ["AI/ML", "Distributed Systems", "Python"],
    category: "AI/ML",
  },
  {
    name: "MERIT Benchmark",
    description: "Metacognition and epistemic reasoning benchmark for LLMs",
    tags: ["AI/ML", "Research", "Python"],
    category: "AI/ML",
  },
  {
    name: "Membrane",
    description: "AI agent OS with layered security and orchestration",
    tags: ["AI", "Infra", "Product"],
    category: "Infra",
  },
  {
    name: "SwarmCortex",
    description: "B2B market simulation engine using multi-agent AI",
    tags: ["AI", "Simulation", "Python"],
    category: "Simulation",
  },
  {
    name: "SitePitch",
    description: "Cold email automation bot for local business outreach",
    tags: ["Tools", "Automation", "Python"],
    category: "Tools",
  },
  {
    name: "@amars1238/llm-parse",
    description: "Published NPM package for LLM output parsing",
    tags: ["Tools", "JavaScript", "Open Source"],
    category: "Tools",
  },
  {
    name: "Brainrot RNG",
    description: "Roblox idle/RNG game with custom reward loop",
    tags: ["Games", "Roblox", "Lua"],
    category: "Games",
  },
  {
    name: "Tsunami Escape Game",
    description: "Roblox tsunami escape with custom physics system",
    tags: ["Games", "Roblox", "Lua"],
    category: "Games",
  },
];

const FILTERS = ["All", "AI/ML", "Simulation", "Tools", "Games", "Hardware", "Infra"];

const LEADERSHIP = [
  { title: "Lead Organizer, CSI Hacks", icon: "🎯" },
  { title: "Robotics Team Captain", icon: "🤖" },
  { title: "UAVs Club President", icon: "🚁" },
  { title: "CSI Vice President", icon: "💡" },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold gradient-text"
          >
            Amar
          </motion.div>
          <div className="flex items-center gap-6">
            <a
              href="#work"
              className="text-sm hover:text-purple-400 transition-colors"
            >
              Work
            </a>
            <a
              href="#projects"
              className="text-sm hover:text-purple-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm hover:text-purple-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 animated-grid opacity-30" />

        {/* Gradient orbs */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
        />

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">Amar</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              High schooler building AI systems, hackathons, and things that probably shouldn't exist yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="#work">
                  <Button className="gradient-button px-8 py-6 text-lg">
                    See My Work
                  </Button>
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="#projects">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10"
                  >
                    View Projects
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-purple-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 max-w-2xl"
          >
            <h2 className="text-3xl font-bold mb-6">About</h2>
            <p className="text-lg text-muted-foreground leading-relaxed space-y-4">
              I'm a sophomore at Foothill High School in Pleasanton, CA. I run CSI Hacks (a student hackathon), captain the robotics team, lead the UAVs club, and serve as VP of the CSI chapter. I'm obsessed with AI infrastructure, distributed systems, and building real products fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hackathon Timeline */}
      <section id="work" className="py-20 relative">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16"
          >
            Hackathon Accomplishments
          </motion.h2>

          <div className="space-y-6">
            {HACKATHONS.map((hackathon, index) => (
              <motion.div
                key={hackathon.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 md:p-8 relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${hackathon.color}`}
                />
                <div className="pl-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-2xl font-bold">{hackathon.name}</h3>
                    <span className="text-sm text-muted-foreground mt-2 md:mt-0">
                      {hackathon.date}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/50">
                      {hackathon.role}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {hackathon.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* More Coming Soon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: HACKATHONS.length * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 relative overflow-hidden opacity-50"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-500 to-slate-600" />
              <div className="pl-4">
                <h3 className="text-2xl font-bold">More Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Building and shipping new projects constantly...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Projects
          </motion.h2>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/50"
                    : "bg-card border border-border hover:border-purple-500/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-card p-6 flex flex-col h-full group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors flex-1">
                    {project.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/50 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 relative">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Leadership
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {LEADERSHIP.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-card p-6 text-center flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="font-medium text-muted-foreground">{item.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-20 relative border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
              <p className="text-muted-foreground text-lg">
                Always building. Reach out.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:amar@example.com"
                className="glass-card p-4 flex items-center gap-3 hover:border-purple-500/50"
              >
                <Mail className="w-5 h-5 text-purple-400" />
                <span>Email</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-3 hover:border-purple-500/50"
              >
                <Github className="w-5 h-5 text-purple-400" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-3 hover:border-purple-500/50"
              >
                <Linkedin className="w-5 h-5 text-purple-400" />
                <span>LinkedIn</span>
              </motion.a>
            </div>

            <div className="pt-8 border-t border-border text-muted-foreground text-sm">
              <p>© 2026 Amar. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
