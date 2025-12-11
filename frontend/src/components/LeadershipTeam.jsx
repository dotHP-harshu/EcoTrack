import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Harsh Prajapti",
    role: "Executive officer",
    image: "/images/team-harsh.png",
    bg: "#a9d2fe",
  },
  {
    id: 2,
    name: "Saurabh Rathore",
    role: "Project manager",
    image: "/images/team-saurabh.png",
    bg: "#ffcca5",
  },
  {
    id: 3,
    name: "Anmol",
    role: "Chief executive",
    image: "/images/team-anmol.png",
    bg: "#2dd4bf",
  },
  {
    id: 4,
    name: "Abhishek Kumar",
    role: "Support technician",
    image: "/images/team-abhi.png",
    bg: "#ffe6a6",
  },
];

const TeamCard = ({ member }) => {
  const cardRef = useRef(null);
  const infoCardRef = useRef(null);
  const defaultTextRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap
        .timeline({ paused: true })
        .to(
          defaultTextRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.2,
            ease: "power2.in",
          },
          0
        )
        .to(
          infoCardRef.current,
          {
            opacity: 1,
            y: -30,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          0.1
        );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center group cursor-pointer"
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
    >
      <div
        className="w-full aspect-square bg rounded-lg relative mb-4 overflow-hidden p-4"
        style={{ backgroundColor: member.bg }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full object-cover object-top relative z-10 transform transition-transform duration-500 group-hover:scale-105"
        />
        <div
          ref={infoCardRef}
          className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-xl p-4 text-center opacity-0 translate-y-4 scale-95 origin-bottom z-10"
        >
          <h3 className="text-gray-900 font-bold text-lg">{member.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{member.role}</p>
        </div>
      </div>
      <div ref={defaultTextRef} className="text-center transition-opacity">
        <h3 className="text-gray-900 font-bold text-lg">{member.name}</h3>
        <p className="text-gray-500 text-sm">{member.role}</p>
      </div>
    </div>
  );
};

const LeadershipTeam = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-badge", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none restart none",
        },
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".team-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "restart none restart none",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".team-grid > div", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "restart none restart none",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 px-4 md:px-8 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="team-badge inline-block bg-[#2DD4BF] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide mb-4">
            Dedicated Team
          </span>
          <h2 className="team-title text-4xl md:text-5xl font-bold text-gray-900">
            Leadership{" "}
            <span className="relative z-10">
              Team
              <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-100 -z-10 opacity-60"></span>
            </span>
          </h2>
        </div>
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
