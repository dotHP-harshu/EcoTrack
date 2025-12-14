import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Intro() {
  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    // setup dasharray + dashoffset
    document.querySelectorAll("path").forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    // Animate all three paths with overlap and random shuffle timing
    const paths = [
      { selector: ".third-path", ease: "power3.out" },
      { selector: ".first-path", ease: "circ.inOut" },
      { selector: ".second-path", ease: "expo.inOut" },
    ];

    // Shuffle the order randomly
    gsap.utils.shuffle(paths).forEach((item, i) => {
      timeline.to(
        item.selector,
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: item.ease,
        },
        i === 0 ? 0 : `-=${0.5 + Math.random() * 0.3}` // start before previous ends
      );
    });

    // Then scale logo and reveal name
    timeline
      .to(".logo", {
        scale: 0.65,
        y: -50,
        duration: 0.8,
        ease: "expo.out",
      })
      .to(
        ".logo-name",
        {
          scale: 1,
          opacity: 1,
          y: 100,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(".intro-page", {
        y: "-100%",
        duration: 0.8,
        ease: "expo.inOut",
        onComplete: () => {
          document.querySelector(".intro-page").style.display = "none";
        },
      });
  });

  return (
    <div className="w-dvw h-dvh bg-bg-subtle fixed top-0 left-0 flex justify-center items-center z-50 intro-page">
      <div className="relative">
        {/* SVG logo */}
        <div className="logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
          <svg
            width="342"
            height="275"
            viewBox="0 0 342 275"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="aspect-auto min-w-[250px] max-w-sm"
          >
            <path
              className="first-path"
              d="M212 233.729C242.425 229.874 262.23 232.932 302 197.729C325.211 172.921 330.819 155.238 335 120.729C337.859 89.2406 335.786 65.6894 329 18.7289C282.942 38.9587 258.042 51.8356 219 83.7289C183.549 121.382 181.848 149.476 187 202.729"
              stroke="#6F9069"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              className="second-path"
              d="M218 60.7289L121 5.72891L5 69.7289V201.729L121 268.729C121 268.729 177 240.729 223 194.729M299 77.7289C299 77.7289 269 148.729 223 194.729M223 194.729C235.142 185.607 232.114 133.609 223 129.729M254 93.7289C264.582 127.729 259.327 149.729 264.582 141.729"
              stroke="#6F9069"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              className="third-path"
              d="M159 196.729C142.5 211.729 109.168 218.648 77 206.229C46.3215 185.688 39.3404 171.578 38 131.729C39.7984 101.025 51.6 78.6775 80 65.7289C108.449 52.758 136.68 58.8831 159 76.7289"
              stroke="#6F9069"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Logo name */}
        <div className="logo-name scale-50 opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
          <h1 className="text-5xl text-center font-extrabold font-bulter text-[#446344]">
            EcoTrack
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Intro;
