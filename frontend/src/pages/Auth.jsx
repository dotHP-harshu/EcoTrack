import React, { useRef, useState } from "react";
import LoginCompo from "../components/LoginCompo";
import SignUpCompo from "../components/SignUpCompo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Plus } from "lucide-react";

function Auth() {
  const [isShowingLogin, setIsShowingLogin] = useState(false);
  const overlayRef = useRef(null);
  const [message, setMessage] = useState("")

  // Transition Animation 
  useGSAP(() => {
    const timeline = gsap.timeline();
    gsap.set(overlayRef.current, { display: "block" });

    timeline
      .to(overlayRef.current, {
        delay: -1,
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        x: "100%",
        scale: 0.98,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: "none" });
        },
      });
  }, [isShowingLogin]);

  // useGSAP(()=>{
  //   gsap.from(".auth-message",{
  //     scale:0.5,
  //     opacity:0,
  //     duration:0.4,
  //     ease:"power3.out"
  //   })
  // }, [message])

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-dvw h-dvh bg-[#0000008c] z-20 translate-x-full"
        ref={overlayRef}
      />

      {isShowingLogin ? (
        <LoginCompo setIsShowingLogin={setIsShowingLogin} setMessage={setMessage}/>
      ) : (
        <SignUpCompo setIsShowingLogin={setIsShowingLogin} setMessage={setMessage} />
      )}

      {message !== "" && (
        <div className="auth-message max-w-sm fixed flex flex-col-reverse justify-center items-center gap-1 z-10 top-4 left-1/2 -translate-x-1/2 bg-primary-hover pl-4 pr-2 py-0.5">
          <p className="text-sm text-white font-mono font-light tracking-tighter text-center">
            {message}
          </p>
          <span onClick={()=>{
            setMessage("")
          }} className="cursor-pointer hover:rotate-180 transition-transform">
            <Plus className="rotate-45 text-white" />
          </span>
        </div>
      )}
    </div>
  );
}

export default Auth;
