import React from "react";
import limg from "../assets/Images/limg.png"
import ylogo from "../assets/Images/ylogo.png"
import { motion } from "framer-motion";
import mimg from "../assets/Images/mimg.png"

function LandingPage() {



    const container = {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.15
          }
        }
      };
      
      const wordVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      };
      
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-8 md:px-20 bg-white">
      {/* Left Side */}
      <div className="w-full md:w-1/2 space-y-8 text-center md:text-left mt-0 md:mt-[-40px] pl-11">

      <motion.p
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="text-xl text-orange-500 font-semibold font-serif tracking-wide"
  >
    Future Sathi will make it easy
  </motion.p>
  <motion.div
  variants={container}
  initial="hidden"
  animate="visible"
  className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight flex flex-wrap justify-center md:justify-start gap-2"
>
  {["Transform", "Your", "Journey", "With", "The", "Right", "Guidance"].map((word, i) => (
    <motion.span key={i} variants={wordVariant}>
      {word}
    </motion.span>
  ))}
</motion.div>


        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg text-gray-600"
        >
          Our experts are here to support you through every step.<br />
          Begin your personalized experience today.
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition cursor-pointer"
          onClick={()=> {
            const section = document.getElementById("courses");
            section ?.scrollIntoView({behavior : "smooth"});
          }}
        >
          Get Started
        </motion.button>
      </div>

     {/* Right Side */}
<div className="w-full md:w-1/2 relative mt-12 md:mt-0 flex justify-center items-center">
  {/* Orange Background Shape */}
  <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-orange-500 rotate-[-10deg] rounded-lg -z-10"></div>

  {/* Foreground Image */}
  <img
  src={limg}
  alt="Main Visual"
  className="w-[420px] h-[440px] md:w-[460px] md:h-[480px] relative -mt-10 z-10"
/>


 
<img
  src={ylogo}
  alt="YouTube Logo"
  className="absolute -top-10  -md:top-5 md:left-28 w-20 h-20 -rotate-12 z-20"
/>

<img
  src={mimg}
  alt="YouTube Logo"
  className="absolute top-35  -md:top-5 md:left-140 w-20 h-20 -rotate-12 z-20"
/>

</div>



    </div>
  );
}

export default LandingPage;
