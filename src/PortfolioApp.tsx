import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { 
  CheckCircle, 
  Mail, 
  Calendar, 
  Database, 
  Headphones, 
  Share2, 
  Zap, 
  Plane, 
  FileText,
  Star,
  Linkedin,
  Instagram,
  Menu,
  X,
  ArrowRight,
  MessageSquare,
  Video,
  Palette,
  Code,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  MousePointer2,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Play,
  Award,
  Users,
  Briefcase
} from "lucide-react";

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-blue pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0)",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const Reveal = ({ children, width = "fit-content" }: { children: React.ReactNode, width?: "fit-content" | "100%" }) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-1 bottom-1 left-0 right-0 bg-brand-blue z-20"
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-5"}`}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-brand-blue z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold text-brand-dark tracking-tight group"
        >
          Karthick <span className="text-brand-blue group-hover:text-brand-dark transition-colors duration-300">VA</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-brand-blue transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a 
            href="https://calendly.com/karthickdhamodaranofficial/30min"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-blue transition-all shadow-lg hover:shadow-brand-blue/20"
          >
            Book a Call
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden bg-white/95 backdrop-blur-lg overflow-hidden border-t border-gray-100"
      >
        <div className="p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium hover:text-brand-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://calendly.com/karthickdhamodaranofficial/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-dark text-white px-6 py-4 rounded-2xl text-center font-semibold shadow-xl"
            onClick={() => setIsOpen(false)}
          >
            Book a Call
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -z-10"
      />
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-dark/5 rounded-full blur-[100px] -z-10"
      />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 px-4 py-2 rounded-full text-brand-blue text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles size={14} className="animate-pulse" /> Available for new projects
            </div>
          </Reveal>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tighter">
            Get Your <br />
            Time & <br />
            <motion.span 
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="text-brand-blue italic bg-gradient-to-r from-brand-blue via-brand-dark to-brand-blue bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Sanity
            </motion.span> Back
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 mb-12 max-w-lg leading-relaxed"
          >
            I help busy entrepreneurs scale by managing their backend operations, so they can focus on high-level strategy and growth.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.a 
              href="https://calendly.com/karthickdhamodaranofficial/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-center transition-all shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-2 group"
            >
              Book a Discovery Call
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="#services" 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-brand-dark text-brand-dark px-10 py-5 rounded-full font-bold text-center transition-all"
            >
              View My Services
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-brand-blue/20 rounded-full blur-[100px] animate-pulse"></div>
          <motion.div
            whileHover={{ rotateY: 10, rotateX: -5 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative z-10 perspective-1000"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1Nc8SY8fwKcXXm_C-LEFeKmUWy6FbzFRu" 
              alt="Karthick - Virtual Assistant" 
              className="rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white w-full h-[600px] md:h-[800px] object-cover object-[center_15%] relative z-10"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl z-20 hidden lg:block border border-white/50"
            >
              <div className="flex items-center gap-5">
                <div className="bg-brand-blue text-white p-4 rounded-3xl shadow-lg shadow-brand-blue/30">
                  <Clock size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Efficiency</p>
                  <p className="text-xl font-bold text-brand-dark">10+ Hours Saved/Week</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 grid grid-cols-5 gap-3 opacity-30">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-brand-blue rounded-full"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustSection = () => {
  const items = [
    "Trusted by Entrepreneurs",
    "Reliable Support",
    "Fast Delivery",
    "Confidential Work"
  ];

  return (
    <div className="bg-white py-10 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <CheckCircle className="text-brand-blue" size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const skills = [
    "Video Editing",
    "Graphic Design",
    "Social Media Handling",
    "Vibe coding",
    "Automation",
    "AI Content Generation",
    "All kind of VA supports"
  ];

  const details = [
    { title: "Tools Used", desc: "Beginner in Notion, Slack, Zapier, GHL. Intermediate in Canva, Premiere Pro, Capcut, and Google Workspace." },
    { title: "Work Style", desc: "Proactive, detail-oriented, and highly communicative." }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
            <div className="bg-brand-light p-10 md:p-16 rounded-[40px] border border-gray-100 relative">
              <h2 className="text-5xl font-serif font-bold mb-8 text-brand-dark">Hi, I'm Karthick</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                My mission is to clear your plate of repetitive tasks so you can reclaim your creative energy and focus on what truly matters.
              </p>
              
              <div className="space-y-8">
                {details.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-brand-blue/10 p-3 rounded-2xl h-fit text-brand-blue">
                      {i === 0 ? <Database size={20} /> : <Zap size={20} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-dark mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <h3 className="text-2xl font-serif font-bold mb-6 text-brand-dark flex items-center gap-3">
                <span className="w-8 h-px bg-brand-blue"></span> My Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: "#1E40AF", color: "#fff" }}
                    className="px-6 py-3 bg-brand-light border border-gray-100 rounded-2xl text-sm font-semibold text-brand-dark transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="bg-brand-dark p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-xl font-serif italic mb-6 relative z-10">
                "Karthick delivered excellent video editing and graphic design work, completing every task I assigned to him on time and with great quality."
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-bold">J</div>
                <div>
                  <p className="font-bold text-sm">Jeevitha</p>
                  <p className="text-xs text-gray-400">Founder, Jeevz</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Mail />, title: "Email & Inbox Management", desc: "Organize, filter, and respond to emails professionally to keep your inbox clutter-free." },
    { icon: <Calendar />, title: "Calendar & Schedule Management", desc: "Manage appointments, schedule meetings, and optimize your calendar for maximum productivity." },
    { icon: <Share2 />, title: "Social Media Assistance", desc: "Content scheduling, monitoring, and engagement to boost your social media presence." },
    { icon: <Zap />, title: "Tech Support", desc: "Automation, and productivity tools and I simplify your backend work so you can focus on growing your business." },
    { icon: <Video />, title: "Video Editing", desc: "High-quality video editing to make your content stand out and engage your audience." },
    { icon: <Palette />, title: "Graphic Design", desc: "Creative and professional designs for your brand, social media, and marketing materials." },
    { icon: <Code />, title: "Vibe Coding", desc: "Specialized coding and technical support to enhance your digital presence and workflows." },
    { icon: <Sparkles />, title: "AI Image & Video Generation", desc: "Cutting-edge AI tools to generate stunning visuals and videos for your brand." }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-brand-light relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              Expertise & Solutions
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Services Designed <br />
              For <span className="text-brand-blue italic">Growth</span>
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ 
                y: -15,
                rotateX: -5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="p-10 rounded-[48px] bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all border border-gray-100 group flex flex-col h-full perspective-1000"
            >
              <div className="w-16 h-16 bg-brand-light rounded-[24px] flex items-center justify-center text-brand-blue mb-8 group-hover:bg-brand-blue group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-brand-dark group-hover:text-brand-blue transition-colors leading-tight">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Arjun and Guru", role: "Founders, SOI – Stories Of India Podcast", text: "Karthick helped us grow on social media. We worked together as a great team, and we really liked his work and character.", rating: 5 },
    { name: "Sulochana", role: "Head Director, AIMTN – Anna Institute of Management", text: "Karthick supported us for three years during his undergraduate college period. He regularly came on Saturdays and Sundays to handle the camera, manage live presentations, and edit those live sessions into videos, shorts, and other content. During long college holidays and after exams, he would come and work full-day as well. He has been with us since the beginning of the project, and his work has always been excellent. We truly appreciated his dedication and character.", rating: 5 },
    { name: "Saravanan", role: "EX HEAD VIDEO EDITOR, AICSCC TN - ALL INDIA CIVIL SERVICES COACHING CENTRE", text: "Karthick supported us with video editing, camera handling, and graphic design for the past two years. We truly appreciated his dedication and good character.", rating: 5 }
  ];

  return (
    <section id="testimonials" className="py-32 px-6 bg-brand-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-brand-blue font-bold tracking-[0.3em] uppercase text-xs mb-4">Testimonials</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter">Client Love</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white flex flex-col h-full group hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, starIdx) => (
                  <motion.div
                    key={starIdx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * 0.2) + (starIdx * 0.1) }}
                  >
                    <Star size={18} className="fill-brand-blue text-brand-blue" />
                  </motion.div>
                ))}
              </div>
              
              <div className="relative mb-10 flex-grow">
                <span className="absolute -top-6 -left-4 text-8xl text-brand-blue/10 font-serif leading-none pointer-events-none">“</span>
                <p className="text-gray-600 italic text-lg leading-relaxed relative z-10">
                  {t.text}
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-50">
                <div>
                  <p className="font-bold text-brand-dark text-xl group-hover:text-brand-blue transition-colors">{t.name}</p>
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseMe = () => {
  const points = [
    { title: "Fast response time", icon: <Zap /> },
    { title: "Organized workflow", icon: <Database /> },
    { title: "Confidentiality guaranteed", icon: <ShieldCheck /> },
    { title: "Strong communication", icon: <MessageSquare /> },
    { title: "Deadline-focused", icon: <Clock /> },
    { title: "Quick learner", icon: <Sparkles /> }
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif font-bold mb-12">Why Choose Me?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {points.map((point, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="bg-brand-blue/10 p-3 rounded-2xl text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  {point.icon}
                </div>
                <span className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{point.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div 
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="bg-brand-dark rounded-[48px] p-16 text-white relative z-10 shadow-3xl overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-brand-blue/20 transition-all duration-700"></div>
            <h3 className="text-3xl font-serif font-bold mb-8 italic leading-relaxed">
              "Your time is your biggest asset — delegate the rest and focus on growth."
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                <FileText size={20} />
              </div>
              <p className="text-brand-blue font-bold text-xl">— Karthick Dhamodaran</p>
            </div>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border-2 border-brand-blue/10 rounded-full -z-0 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-brand-blue/5 rounded-full -z-0 animate-[spin_15s_linear_infinite_reverse]"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    { 
      name: "Basic", 
      price: "$70", 
      period: "/Month",
      subPrice: "$7/HOUR",
      subtitle: "Ideal for small business owners need a helping hand!",
      description: "10 HOURS A MONTH. WEEKLY CALLS"
    },
    { 
      name: "Standard", 
      price: "$120", 
      period: "/Month",
      subPrice: "$6/HOUR",
      subtitle: "Ideal for small business owners who needs to take off their tedious tasks!",
      description: "20 hours a month. Weekly calls"
    },
    { 
      name: "Premium", 
      price: "$150+", 
      period: "/Month",
      subPrice: "$5/HOUR",
      subtitle: "Ideal for small business owners who needs full support!",
      description: "30+ hours a month. Weekly calls"
    }
  ];

  return (
    <section id="pricing" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs mb-4">Investment</div>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6">Simple Pricing</h2>
          <p className="text-gray-500 text-lg md:text-xl">Choose the plan that fits your current needs.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-24 md:mb-32">
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -20 }}
              className={`p-8 md:p-12 rounded-[40px] md:rounded-[60px] bg-white border flex flex-col h-full relative transition-all duration-500 ${i === 1 ? "border-brand-blue shadow-[0_40px_80px_-20px_rgba(30,64,175,0.15)] md:scale-105 z-10" : "border-gray-100 shadow-xl shadow-gray-100/50"}`}
            >
              {i === 1 && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-brand-blue font-bold text-sm mb-8">{plan.subtitle}</p>
              
              <div className="mb-10 flex-grow">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-brand-dark tracking-tighter">{plan.price}</span>
                  <span className="text-gray-400 font-bold">{plan.period}</span>
                </div>
                <div className="text-brand-blue font-bold text-xs mt-2 ml-1 tracking-widest uppercase">
                  {plan.subPrice}
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed italic border-t border-gray-50 pt-8">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a 
          href="https://calendly.com/karthickdhamodaranofficial/30min"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group block cursor-pointer"
        >
          <div className="absolute -inset-4 bg-brand-blue/20 rounded-[60px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="text-center max-w-4xl mx-auto bg-brand-dark p-10 md:p-24 rounded-[40px] md:rounded-[60px] text-white shadow-3xl relative z-10 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <p className="text-brand-blue font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-8">THE BEST WAY TO FIND OUT IS SIMPLE, LET'S TALK:</p>
            <h3 className="text-3xl md:text-6xl font-serif font-bold mb-10 md:mb-12 italic leading-tight">Ready to reclaim <br /> your time?</h3>
            <div 
              className="inline-flex items-center gap-3 md:gap-4 bg-white text-brand-dark px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-lg md:text-xl transition-all shadow-2xl group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              Book a Discovery call
              <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-blue font-bold tracking-[0.2em] uppercase text-xs mb-6"
            >
              Get In Touch
            </motion.div>
            <h2 className="text-4xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">
              Ready to Save <br />
              <span className="text-brand-blue italic">10+ Hours</span> <br />
              Per Week?
            </h2>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-md">
              Let's chat about how I can help you scale your business and reclaim your creative energy.
            </p>
            
            <div className="space-y-8 mb-16">
              {[
                { icon: <Mail />, label: "Email Me", value: "karthickdhamodaranofficial@gmail.com" },
                { icon: <MessageSquare />, label: "WhatsApp", value: "+91 96774 86089" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 15 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="bg-brand-light p-4 sm:p-6 rounded-[24px] text-brand-dark group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-brand-blue/20">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                    <p className="font-bold text-lg sm:text-2xl text-brand-dark group-hover:text-brand-blue transition-colors break-all sm:break-normal">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-6">
              {[
                { icon: <Linkedin />, href: "https://www.linkedin.com/in/karthick-dhamodaran/" },
                { icon: <Instagram />, href: "https://www.instagram.com/karthick_d_offficial/" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.1, backgroundColor: "#1E40AF", color: "#fff" }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-brand-light p-6 rounded-[24px] text-brand-dark transition-all shadow-sm hover:shadow-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand-dark p-8 md:p-16 rounded-[40px] md:rounded-[64px] text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col items-center justify-center text-center"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10">
              <div className="bg-brand-blue/20 p-6 md:p-8 rounded-full w-fit mx-auto mb-8 md:mb-10">
                <Calendar size={40} className="text-brand-blue md:w-14 md:h-14" />
              </div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6 italic">Let's Schedule a Call</h3>
              <p className="text-white/60 mb-10 md:mb-12 text-lg md:text-xl max-w-sm mx-auto leading-relaxed">
                Pick a time that works best for you and let's discuss how we can work together to scale your business.
              </p>
              <motion.a 
                href="https://calendly.com/karthickdhamodaranofficial/30min" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 md:gap-4 bg-brand-blue text-white px-8 md:px-14 py-4 md:py-7 rounded-2xl md:rounded-3xl font-bold text-xl md:text-2xl shadow-2xl transition-all"
              >
                Book a Call <ArrowRight size={24} className="md:w-7 md:h-7" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Personal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const images = [
    {
      src: "https://drive.google.com/thumbnail?id=19-8v-yMvbd7DnEG372wjfn2GZm91sBsO&sz=w800",
      title: "By \"Terzaghi Institute\" (\"Anna University\")",
      location: "2024-2025",
      desc: "A moment of inspiration captured in time. Exploring new concepts and pushing the boundaries of what's possible in design."
    },
    {
      src: "https://drive.google.com/thumbnail?id=1wwKIUzOcSauMwVCNJ5pIgp2bq2W9Iffs&sz=w800",
      title: "At \"Gen AI.Connect\"",
      location: "2024",
      desc: "Every great project starts with a single step. This represents the ongoing journey of learning and evolving as a creator."
    },
    {
      src: "https://drive.google.com/thumbnail?id=1a4a3IQj8RU2K_wQa-MzrEqYDezh5iVPF&sz=w800",
      title: "At \"AIMTN & AICSCC\" (\"Anna Institute of Management, All India Civil Service Coaching Centre\")",
      location: "2022-2025",
      desc: "Finding the perfect balance between aesthetics and functionality. It's all about creating experiences that feel just right."
    },
    {
      src: "https://drive.google.com/thumbnail?id=1OPNzB46i1B4L2RQ_iF3AEaM1BAZchjMx&sz=w800",
      title: "During my undergraduate studies at \"Thiruthangal Nadar College\", I received the \"Chief Guest Award\" from the Head of the Computer Science Department.",
      location: "2025",
      desc: "Sometimes the best ideas come from stepping back and looking at things from a completely different perspective."
    },
    {
      src: "https://drive.google.com/thumbnail?id=1sTeVKy82LAc18ScbR4acKIjxQ-MkS2cV&sz=w800",
      title: "At \"IconXT\"",
      location: "2024-2025",
      desc: "Experimenting with how different hues and lighting can completely change the mood and message of a piece."
    },
    {
      src: "https://drive.google.com/thumbnail?id=1Yo-fR1LVVKlUePlBOKMBOb2jfAUzv69F&sz=w800",
      title: "At \"AIMTN\" (\"Anna Institute of Management\")",
      location: "2022-2025",
      desc: "That satisfying moment when all the pieces come together and the final vision is finally realized."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (selectedImage !== null || isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex, selectedImage, isHovered]);

  const getOffset = (index: number) => {
    const total = images.length;
    let offset = index - currentIndex;
    if (offset > Math.floor(total / 2)) {
      offset -= total;
    } else if (offset < -Math.floor(total / 2)) {
      offset += total;
    }
    return offset;
  };

  return (
    <section id="personal" className="py-24 bg-gradient-to-b from-brand-light to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-4 block">Personalization</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">A Personal Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beyond the professional work, here's a glimpse into my personal creative journey and inspirations.
          </p>
        </motion.div>
      </div>

      <div 
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 h-[450px] md:h-[600px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <button 
          onClick={prevSlide} 
          className="absolute left-4 sm:left-12 z-40 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-brand-blue hover:text-white hover:scale-110 hover:shadow-brand-blue/30 transition-all duration-300 border border-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Carousel */}
        <div className="relative w-full h-full flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
          {images.map((img, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            
            // Calculate smooth transforms based on offset
            const xOffset = windowWidth < 768 ? 120 : 220;
            const x = offset * xOffset;
            const z = -absOffset * 150;
            const rotateY = offset * -20;
            const scale = 1 - absOffset * 0.15;
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3;
            const zIndex = 20 - absOffset;

            return (
              <motion.div
                key={index}
                layoutId={`personal-img-${index}`}
                animate={{
                  x,
                  z,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1], // Super smooth custom easing
                }}
                className={`absolute w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] md:w-[400px] md:h-[520px] rounded-[2rem] overflow-hidden cursor-pointer bg-white ${isActive ? 'ring-4 ring-brand-blue/40 shadow-[0_30px_60px_rgba(0,0,0,0.3)]' : 'shadow-[0_10px_30px_rgba(0,0,0,0.1)]'}`}
                onClick={() => isActive ? setSelectedImage(index) : setCurrentIndex(index)}
                style={{ transformOrigin: "center center" }}
              >
                <div className="w-full h-full relative group p-4 sm:p-6 flex flex-col">
                  <div className="flex-1 relative w-full overflow-hidden rounded-xl">
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="w-full h-full object-contain transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  
                  <div className="mt-4 text-center shrink-0 px-2">
                    <h3 className="text-lg font-bold text-brand-dark leading-tight mb-1">{img.title}</h3>
                    <p className="text-sm text-gray-500">{img.location}</p>
                  </div>
                  
                  {/* Overlay for inactive slides */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] transition-opacity duration-500 rounded-[2rem]" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={nextSlide} 
          className="absolute right-4 sm:right-12 z-40 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-brand-blue hover:text-white hover:scale-110 hover:shadow-brand-blue/30 transition-all duration-300 border border-white/20"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white hover:text-brand-blue transition-all duration-500 bg-white/10 hover:bg-white/30 p-4 rounded-full z-50 hover:rotate-90"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </button>
            
            <motion.div
              layoutId={`personal-img-${selectedImage}`}
              className="relative max-w-5xl w-full h-[80vh] bg-transparent flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                src={images[selectedImage].src} 
                alt={images[selectedImage].title} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl"
                referrerPolicy="no-referrer"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 border-b border-white/10 pb-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3 className="text-5xl font-serif font-bold mb-6 tracking-tighter italic">Karthick Dhamodaran</h3>
            <p className="text-white/50 max-w-sm text-xl leading-relaxed">
              Empowering small business owners through dedicated virtual assistance and creative solutions. Reclaim your time today.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-8 text-brand-blue">Navigation</h4>
              <ul className="space-y-4">
                {["Home", "About", "Services", "Pricing", "Contact"].map((item, i) => (
                  <li key={i}>
                    <motion.a
                      href={`#${item.toLowerCase()}`}
                      whileHover={{ x: 5, color: "#3B82F6" }}
                      className="text-lg text-white/70 transition-all"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs mb-8 text-brand-blue">Social</h4>
              <ul className="space-y-4">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/karthick-dhamodaran/" },
                  { label: "Instagram", href: "https://www.instagram.com/karthick_d_offficial/" }
                ].map((social, i) => (
                  <li key={i}>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5, color: "#3B82F6" }}
                      className="text-lg text-white/70 transition-all"
                    >
                      {social.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>© 2026 Karthick Dhamodaran. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function PortfolioApp() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white scroll-smooth bg-white overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-blue z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <About />
        <Services />
        <Testimonials />
        <WhyChooseMe />
        <Pricing />
        <Contact />
        <Personal />
      </main>
      <Footer />

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        whileHover={{ scale: 1.1, backgroundColor: "#1E40AF", y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-12 right-12 z-50 bg-brand-dark text-white p-6 rounded-[24px] shadow-3xl flex items-center justify-center border border-white/10"
      >
        <ArrowRight className="-rotate-90" size={28} />
      </motion.button>
    </div>
  );
}
