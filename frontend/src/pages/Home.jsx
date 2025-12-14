import React, { useState, useRef } from "react";
import MattersCard from "../components/MattersCard";
import HomeTipCard from "../components/HomeTipCard";
import WorkCard from "../components/WorkCard";
import Intro from "../components/Intro";
import { useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import LeadershipTeam from "../components/LeadershipTeam";

gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);

const matterData = [
  {
    bg: "#E9FFDB",
    title: "Global Deforestation",
    heading: "15 Billion Trees Cut Annually",
    paragraph:
      "Equivalent to 27 football fields lost every minute, contributing to climate change and biodiversity loss.",
  },
  {
    bg: "#FCE7F3",
    title: "Water Stress",
    heading: "2.2 Billion Lack Safe Drinking Water",
    paragraph:
      "A growing global health challenge, exacerbated by climate change and pollution, affecting communities worldwide.",
  },
  {
    bg: "#CFFAFE",
    title: "Plastic Crisis",
    heading: "8 Million Tons Enter Oceans Yearly",
    paragraph:
      "Harming marine life and ecosystems, with microplastics now found worldwide in food and water.",
  },
  {
    bg: "#E0E7FF",
    title: "Biodiversity Loss",
    heading: "1 Million Species Threatened",
    paragraph:
      "Irreversible damage to ecosystems, leading to a significant reduction in the variety of life on Earth.",
  },
];

const recommendationData = [
  {
    tags: ["Transport", "Carbon Emissions"],
    paragraph:
      "Biking or walking for short trips can cut your transport emissions by up to 75%.",
  },
  {
    tags: ["Food", "Sustainability"],
    paragraph:
      "Eating plant-based just one day a week can save the same emissions as skipping a 1,600 km car trip annually.",
  },
  {
    tags: ["Energy", "Home"],
    paragraph:
      "Unplugging devices when not in use can reduce phantom energy loss by up to 10% of your bill.",
  },
  {
    tags: ["Fashion", "Consumption"],
    paragraph:
      "Buying second-hand clothes reduces carbon emissions by 60–70% compared to buying new.",
  },
  {
    tags: ["Water", "Climate"],
    paragraph:
      "Fixing a leaky tap can save over 3,000 liters of water per year — and the energy to heat it.",
  },
  {
    tags: ["Home", "Insulation"],
    paragraph:
      "Proper insulation can cut heating needs by 30%, slashing both emissions and energy bills.",
  },
  {
    tags: ["Tech", "E-Waste"],
    paragraph:
      "Extending your phone’s life by just one year cuts its annual carbon footprint by 30%.",
  },
  {
    tags: ["Food", "Waste"],
    paragraph:
      "Composting food scraps reduces methane emissions from landfills and enriches your soil naturally.",
  },
];

const workingSteps = [
  {
    bg: "#E0E7FF",
    step: 1,
    heading: "Track Your Impact",
    paragraph:
      "Log your daily activities, energy consumption, and waste production with ease.",
  },
  {
    bg: "#FEF9C3",
    step: 2,
    heading: "Analyze Data",
    paragraph:
      "Get personalized insights and clear visualizations of your environmental footprint over time.",
  },
  {
    bg: "#E0F2FE",
    step: 3,
    heading: "Act Sustainably",
    paragraph:
      "Receive tailored recommendations and join challenges to make a positive difference.",
  },
];

const heroBackground = {
  background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
};

const workingBackground = {
  background: "linear-gradient(to bottom, #f8fdf9, #e9ffdb)",
};

function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const mattersRef = useRef(null);
  const workingRef = useRef(null);
  const tipsRef = useRef(null);

  useGSAP(
    () => {
      const heroSection = document.querySelector(".hero-section");
      const heroTimeline = gsap.timeline({ delay: 4 });
      if (!heroSection) return; // prevent crash

      // Hero text animations with stagger
      heroTimeline
        .to(".hero-section h2", {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.inOut",
        })
        .from(
          ".hero-section h1",
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-section p",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(".hero-btn", {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      // Hero image floating animation
      gsap.to(".hero-img", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Hero scroll animation with rotation
      gsap.to(".hero-section", {
        scale: 0.75,
        rotation: -15,
        y: 250,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3D parallax effect on mouse move
      heroSection.addEventListener("mousemove", (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to(".hero-img", {
          perspective: 200,
          rotateX: moveY,
          rotateY: moveX,
          x: moveX / 4,
          y: moveY / 4,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    },
    { scope: heroRef.current }
  );

  useGSAP(
    () => {
      gsap.from(".section-second", {
        scale: 0.85,
        opacity: 0,
        scrollTrigger: {
          trigger: ".section-second",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Matters section animations
      gsap.from(".matters-heading", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".matters-heading",
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });

      gsap.from(".matters-subtitle", {
        y: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: ".matters-subtitle",
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Featured matter card animation
      gsap.from(".featured-matter", {
        scale: 0.9,
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".featured-matter",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // Stagger animation for matter cards
      gsap.from(".matter-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".matter-cards-grid",
          start: "top 75%",
          toggleActions: "restart none restart none",
        },
      });
    },
    { scope: mattersRef.current }
  );

  useGSAP(
    () => {
      // Working section animations
      gsap.from(".working-heading", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".working-heading",
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Stagger animation for work cards
      gsap.from(".work-card", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-cards-grid",
          start: "top 70%",
          toggleActions: "restart none restart none",
        },
      });
    },
    { scope: workingRef.current }
  );

  useGSAP(
    () => {
      // Tips section animations
      gsap.from(".tips-heading", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".tips-heading",
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // Stagger animation for tip cards with random delays
      gsap.from(".tip-card", {
        scale: 0.8,
        opacity: 0,
        stagger: {
          amount: 0.8,
          from: "random",
        },
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".tips-cards-grid",
          start: "top 75%",
          toggleActions: "restart none restart none",
        },
      });
    },
    { scope: tipsRef }
  );

  return (
    <>
      <Intro />
      {/* Hero section */}
      <section
        ref={heroRef}
        className="hero-section min-h-dvh w-full grid grid-cols-2 max-sm:grid-cols-1 p-6 fixed top-0 left-0 z-[-1] overflow-hidden"
        style={heroBackground}
      >
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="min-h-full w-5/6 flex justify-center items-start flex-col gap-6 px-10 max-sm:w-full">
          <span className="inline-block w-fit overflow-hidden">
            <h1 className="text-6xl font-sora font-bold text-gradient-green max-sm:text-4xl">
              Eco<span className="font-bulter">Track</span>
            </h1>
          </span>
          <h2
            className="text-5xl font-bold tracking-tight font-sora text-text-heading max-sm:text-3xl"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            Track Your Footprint, Grow a Greener Future
          </h2>
          <p className="text-text-light text-lg font-open-sans leading-relaxed max-w-xl">
            EcoTrack empowers you with data-driven insights to understand and
            reduce your environmental impact. Join a community dedicated to a
            sustainable planet.
          </p>
          <button
            onClick={() => navigate("/auth/login")}
            className="hero-btn opacity-0 scale-75 px-6 py-1 bg-accent hover:bg-accent-hover text-white font-sora font-semibold rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md cursor-pointer"
          >
            Register Now
          </button>
        </div>
        <div className="flex justify-center items-center max-sm:hidden">
          <img
            src="/images/hero-banner.png"
            alt="hero"
            className="w-full hero-img object-center drop-shadow-2xl"
          />
        </div>
      </section>
      {/* Hero section */}

      {/* Why it matters section  */}
      <section
        ref={mattersRef}
        className="section-second min-h-dvh mt-[100dvh] w-full bg-bg-subtle py-20 relative overflow-hidden"
      >
        {/* Background decoration */}

        <div className="absolute top-4 right-0 w-96 h-96 bg-[#86ffd3] rounded-full blur-3xl"></div>

        <h2 className="matters-heading text-5xl font-sora font-bold mx-auto w-fit text-center text-text-heading max-sm:text-3xl">
          Why it Matters?
        </h2>
        <p className="matters-subtitle text-xl w-2/3 mx-auto text-center mt-6 text-text-light font-open-sans max-sm:w-11/12">
          The future of our planet depends on our collective actions. Understand
          the critical environmental challenges we face.
        </p>

        <div className="featured-matter max-w-2xl mx-auto w-full mt-20 p-8 rounded-2xl bg-linear-to-br from-[#00563b73] to-[#fff0] backdrop-blur-sm border border-white/20 shadow-xl">
          <img
            src="/images/matter-1.png"
            alt="matter"
            className="max-w-48 block mx-auto drop-shadow-lg animate-float"
          />
          <h3 className="text-4xl font-bold text-center mt-6 font-sora text-text-heading max-sm:text-2xl">
            36.8B tons emitted this year
          </h3>
          <p className="text-text-light text-lg text-center mt-4 font-open-sans">
            Global CO2 emissions continue to rise, impacting our planet's
            climate.
          </p>
        </div>

        <div className="matter-cards-grid max-w-6xl mt-20 mx-auto gap-6 grid grid-cols-2 max-sm:grid-cols-1 p-6">
          {matterData.map((m, i) => (
            <div key={i} className="matter-card">
              <MattersCard
                bg={m.bg}
                title={m.title}
                heading={m.heading}
                paragraph={m.paragraph}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Why it matters section  */}

      {/* How this Works  */}
      <section
        ref={workingRef}
        className="min-h-dvh w-full flex justify-center items-center flex-col py-20 relative overflow-hidden "
        style={workingBackground}
      >
        {/* Background decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <h2 className="working-heading text-5xl font-sora font-bold mx-auto w-fit text-center text-text-heading max-sm:text-3xl">
          How It Works
        </h2>
        <p className="text-xl w-2/3 mx-auto text-center mt-6 text-text-light font-open-sans max-sm:w-11/12">
          EcoTrack makes it simple to understand and improve your environmental
          impact in three easy steps.
        </p>

        <div className="work-cards-grid max-w-6xl mx-auto mt-20 grid grid-cols-3 gap-8 max-sm:grid-cols-1 px-6">
          {workingSteps.map((w, i) => (
            <div key={i} className="work-card">
              <WorkCard
                bg={w.bg}
                step={w.step}
                heading={w.heading}
                paragraph={w.paragraph}
              />
            </div>
          ))}
        </div>
      </section>
      {/* How this Works  */}

      {/* Tips and Recommendations  */}
      <section
        ref={tipsRef}
        className="min-h-dvh w-full py-20 bg-[#e0f2fe] relative overflow-hidden"
      >
        {/* Background decoration */}

        <h2 className="tips-heading text-5xl font-sora font-bold mx-auto w-fit text-center text-text-heading max-sm:text-3xl">
          Tips and Recommendations
        </h2>
        <p className="text-xl w-2/3 mx-auto text-center mt-6 text-text-light font-open-sans max-sm:w-11/12">
          Small changes lead to big impacts. Discover actionable tips to reduce
          your daily footprint.
        </p>

        <div className="tips-cards-grid max-w-6xl mx-auto grid grid-cols-4 max-xs:grid-cols-1 px-6 max-sm:px-4 max-sm:grid-cols-2 justify-center gap-6 mt-16 py-10 auto-rows-auto">
          {recommendationData.map((r, i) => (
            <div key={i} className="tip-card">
              <HomeTipCard tags={r.tags} paragraph={r.paragraph} index={i} />
            </div>
          ))}
        </div>
      </section>
      {/* Tips and Recommendations  */}

      <LeadershipTeam />

      <footer className="bg-[#d8f3e8] flex justify-evenly items-center px-6 py-1 max-sm:flex-col-reverse max-sm:justify-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <img src="/images/logo.svg" alt="logo" className="w-12" />
          <h2 className="text-xl font-bold font-bulter text-accent">
            Eco<span className="text-primary">Track</span>
          </h2>
        </div>
        <div>
          <p className="text-base font-heartfield">
            &copy; Minor Project | 3<sup>rd</sup> Year Students{" "}
          </p>
        </div>
        <div>
          <a href="https://github.com/dothp-harshu/ecotrack" className="p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 291.32 291.32"
            >
              <g>
                <path
                  style={{ fill: "#2B414D" }}
                  d="M145.66,0C65.219,0,0,65.219,0,145.66c0,80.45,65.219,145.66,145.66,145.66   s145.66-65.21,145.66-145.66C291.319,65.219,226.1,0,145.66,0z M186.462,256.625c-0.838-11.398-1.775-25.518-1.83-31.235   c-0.364-4.388-0.838-15.549-11.434-22.677c42.068-3.523,62.087-26.774,63.526-57.499c1.202-17.497-5.754-32.883-18.107-45.3   c0.628-13.282-0.401-29.023-1.256-35.941c-9.486-2.731-31.608,8.949-37.79,13.947c-13.037-5.062-44.945-6.837-64.336,0   c-13.747-9.668-29.396-15.64-37.926-13.974c-7.875,17.452-2.813,33.948-1.275,35.914c-10.142,9.268-24.289,20.675-20.447,44.572   c6.163,35.04,30.816,53.94,70.508,58.564c-8.466,1.73-9.896,8.048-10.606,10.788c-26.656,10.997-34.275-6.791-37.644-11.425   c-11.188-13.847-21.23-9.832-21.849-9.614c-0.601,0.218-1.056,1.092-0.992,1.511c0.564,2.986,6.655,6.018,6.955,6.263   c8.257,6.154,11.316,17.27,13.2,20.438c11.844,19.473,39.374,11.398,39.638,11.562c0.018,1.702-0.191,16.032-0.355,27.184   C64.245,245.992,27.311,200.2,27.311,145.66c0-65.365,52.984-118.348,118.348-118.348S264.008,80.295,264.008,145.66   C264.008,196.668,231.69,239.992,186.462,256.625z"
                />
              </g>
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Home;
