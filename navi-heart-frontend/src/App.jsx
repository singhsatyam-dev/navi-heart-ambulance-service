import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartPulse,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Siren,
  Truck,
  X,
  Zap,
} from "lucide-react";
import axios from "axios";

const services = [
  {
    icon: Clock3,
    title: "24/7 Rapid Response",
    description:
      "Our ambulance network remains active around the clock for urgent medical transportation.",
    color: "sky",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Life Support",
    description:
      "Medical equipment including oxygen, defibrillators and emergency support systems.",
    color: "red",
  },
  {
    icon: HeartPulse,
    title: "Cardiac Care",
    description:
      "Specialized emergency support with continuous patient monitoring during transportation.",
    color: "cyan",
  },
];

const stats = [
  {
    value: "24/7",
    label: "Available",
  },
  {
    value: "< 3 min",
    label: "Dispatch",
  },
  {
    value: "100%",
    label: "GPS Tracked",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [status, setStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await axios.post("http://localhost:5000/api/emergency", formData);

      setStatus("success");

      setFormData({
        name: "",
        phone: "",
        location: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fbff] text-slate-900">
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}

          <a href="#" className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30">
              <HeartPulse size={25} strokeWidth={2.5} className="text-white" />

              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </div>

            <div>
              <p className="text-lg font-extrabold leading-none text-slate-900">
                Navi Heart
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Ambulance Service
              </p>
            </div>
          </a>

          {/* Desktop nav */}

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#services"
              className="text-sm font-semibold text-slate-600 transition hover:text-red-500"
            >
              Services
            </a>

            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 transition hover:text-red-500"
            >
              Why Navi Heart
            </a>

            <a
              href="#request"
              className="text-sm font-semibold text-slate-600 transition hover:text-red-500"
            >
              Request Ambulance
            </a>
          </div>

          {/* Emergency */}

          <div className="hidden md:block">
            <a
              href="tel:+919934000724"
              className="group flex items-center gap-3 rounded-full bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/25 transition hover:-translate-y-0.5 hover:bg-red-600"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              Emergency Call
              <Phone size={17} className="transition group-hover:rotate-12" />
            </a>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-slate-700 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100 bg-white px-5 py-5 md:hidden"
            >
              <div className="flex flex-col gap-5">
                <a href="#services" onClick={() => setMenuOpen(false)}>
                  Services
                </a>

                <a href="#about" onClick={() => setMenuOpen(false)}>
                  Why Navi Heart
                </a>

                <a href="#request" onClick={() => setMenuOpen(false)}>
                  Request Ambulance
                </a>

                <a
                  href="tel:+919934000724"
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold text-white"
                >
                  <Phone size={18} />
                  Emergency Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate min-h-[760px] overflow-hidden bg-slate-950 pt-28">
        {/* Background gradients */}

        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-sky-500/20 blur-[120px]" />

          <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-red-500/20 blur-[120px]" />

          <div className="absolute left-[40%] top-[30%] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />
        </div>

        {/* Grid */}

        <div
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10"
          >
            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Ambulance Network Online
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Rapid Response.
              <br />
              <span className="bg-gradient-to-r from-red-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">
                Saving Lives.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Reliable ambulance transportation with advanced medical equipment,
              trained professionals and rapid dispatch — available whenever you
              need us.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#request"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 shadow-2xl transition hover:-translate-y-1"
              >
                Request Ambulance
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="tel:+919934000724"
                className="flex items-center justify-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-red-500"
              >
                <Phone size={19} />
                Emergency Call +919934000724
              </a>
            </div>

            {/* Stats */}

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur"
                >
                  <p className="text-xl font-black text-white sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right visual */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-[500px]"
          >
            {/* Main circle */}

            <div className="relative aspect-square">
              <div className="absolute inset-[10%] rounded-full border border-sky-400/20" />

              <div className="absolute inset-[18%] rounded-full border border-red-400/20" />

              <div className="absolute inset-[27%] rounded-full bg-gradient-to-br from-sky-500/20 to-red-500/20 blur-xl" />

              {/* ECG */}

              <svg
                viewBox="0 0 500 220"
                className="absolute left-0 top-1/2 w-full -translate-y-1/2"
              >
                <defs>
                  <linearGradient
                    id="ecgGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 110 H110 L135 110 L155 50 L180 175 L205 85 L225 110 H500"
                  fill="none"
                  stroke="url(#ecgGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="ecg-line"
                />
              </svg>

              {/* Center */}

              <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_25px_80px_rgba(239,68,68,0.45)]">
                <div className="absolute inset-2 rounded-[2rem] border border-white/20" />

                <HeartPulse
                  size={80}
                  strokeWidth={1.5}
                  className="text-white"
                />
              </div>

              {/* Floating card */}

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-[12%] rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/20 p-2">
                    <Activity className="text-emerald-300" size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Network Status</p>

                    <p className="font-bold text-white">All Systems Active</p>
                  </div>
                </div>
              </motion.div>

              {/* Location card */}

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[12%] left-0 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-sky-400/20 p-2">
                    <MapPin className="text-sky-300" size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Fleet Tracking</p>

                    <p className="font-bold text-white">GPS Enabled</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8fbff] to-transparent" />
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section id="services" className="relative px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500">
              <Zap size={14} />
              Emergency Ready
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Care that moves
              <span className="text-red-500"> with you.</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Everything you need for dependable emergency and non-emergency
              medical transportation.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-slate-200/60"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-100 opacity-0 blur-2xl transition group-hover:opacity-100" />

                  <div
                    className={`relative mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${
                      service.color === "red"
                        ? "bg-red-50 text-red-500"
                        : service.color === "cyan"
                          ? "bg-cyan-50 text-cyan-500"
                          : "bg-sky-50 text-sky-500"
                    }`}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="relative text-xl font-extrabold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="relative mt-3 leading-7 text-slate-500">
                    {service.description}
                  </p>

                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY NAVI HEART
      ====================================================== */}

      <section id="about" className="bg-slate-950 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-sky-300">
              <Truck size={14} />
              Our Promise
            </div>

            <h2 className="text-4xl font-black text-white sm:text-5xl">
              When every
              <span className="text-red-400"> second matters.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Navi Heart combines rapid dispatch, trained medical personnel and
              technology-enabled fleet tracking to make emergency transportation
              simpler and more reliable.
            </p>

            <div className="mt-9 space-y-5">
              {[
                "GPS tracked ambulance fleet",
                "Experienced emergency personnel",
                "Modern medical equipment",
                "Fast hospital transportation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-200"
                >
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-emerald-400"
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emergency visual */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-500/10 to-red-500/10 p-8">
              <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Emergency Network</p>

                    <p className="mt-1 text-2xl font-black text-white">
                      Active & Ready
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
                    <Activity className="text-emerald-400" size={24} />
                  </div>
                </div>

                <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      Ambulance availability
                    </span>

                    <span className="font-bold text-emerald-400">ONLINE</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "87%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-500">Response</p>

                      <p className="mt-1 text-lg font-bold text-white">
                        &lt; 3 min
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4">
                      <p className="text-xs text-slate-500">Tracking</p>

                      <p className="mt-1 text-lg font-bold text-white">
                        Live GPS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          REQUEST FORM
      ====================================================== */}

      <section
        id="request"
        className="relative overflow-hidden px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200 lg:grid-cols-2">
            {/* Left */}

            <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-8 text-white sm:p-12">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Siren size={28} />
                </div>

                <h2 className="text-4xl font-black sm:text-5xl">
                  Need an
                  <span className="text-red-300"> ambulance?</span>
                </h2>

                <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                  Submit your pickup details and our dispatch team will contact
                  you as soon as possible.
                </p>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-cyan-300" />
                    <span>GPS-enabled fleet</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-cyan-300" />
                    <span>Trained medical personnel</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock3 size={20} className="text-cyan-300" />
                    <span>24/7 dispatch support</span>
                  </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-7">
                  <p className="text-sm text-blue-200">
                    For immediate emergencies
                  </p>

                  <a
                    href="tel:108"
                    className="mt-2 inline-flex items-center gap-3 text-2xl font-black"
                  >
                    <Phone size={23} />
                    Call +919934000724
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}

            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-red-500">
                  Dispatch Request
                </p>

                <h3 className="mt-2 text-3xl font-black text-slate-900">
                  Tell us where you are
                </h3>

                <p className="mt-2 text-slate-500">
                  Our team will use these details to coordinate your request.
                </p>
              </div>

              <form onSubmit={handleRequest} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Patient Name
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Pickup Location
                  </label>

                  <textarea
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your pickup address"
                    required
                    rows="4"
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 py-4 font-bold text-white shadow-lg shadow-red-500/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Request Ambulance
                      <ArrowRight
                        size={19}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                {/* Success */}

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700"
                    >
                      <CheckCircle2 className="mt-0.5 shrink-0" size={20} />

                      <div>
                        <p className="font-bold">Request received!</p>

                        <p className="mt-1 text-sm">
                          Our dispatch team will contact you shortly.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
                    >
                      <p className="font-bold">Unable to send request.</p>

                      <p className="mt-1 text-sm">
                        Please try again or call 108 directly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500">
              <HeartPulse size={20} className="text-white" />
            </div>

            <div>
              <p className="font-bold text-slate-900">Navi Heart</p>

              <p className="text-xs text-slate-400">Ambulance Service</p>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 Navi Heart Ambulance Service. All rights reserved.
          </p>

          <a
            href="tel:+919934000724"
            className="flex items-center gap-2 font-bold text-red-500"
          >
            <Phone size={16} />
            Emergency +919934000724
          </a>
        </div>
      </footer>

      {/* Floating emergency button */}

      <motion.a
        href="tel:+919934000724"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          delay: 1,
          type: "spring",
        }}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-2xl shadow-red-500/40 md:hidden"
      >
        <Phone size={22} />

        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-red-400 opacity-30" />
      </motion.a>
    </div>
  );
};

export default App;
