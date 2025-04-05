import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import eduimg5 from "../assets/Images/eduimg5.jpeg";
import eduimg6 from "../assets/Images/eduimg6.jpeg";
import eduimg7 from "../assets/Images/eduimg7.jpeg";
import webinar from "../assets/Images/webinar.png";
import eduimg8 from "../assets/Images/eduimg8.jpeg";
import eduimg9 from "../assets/Images/eduimg9.jpeg";
import eduimg10 from "../assets/Images/eduimg10.jpeg";
import eduimg11 from "../assets/Images/eduimg11.jpeg";

const emojis = [
 
  eduimg5,
  eduimg6,
  eduimg7,
  eduimg8,
  webinar,
  eduimg9,
  eduimg10,
  eduimg11,
];

const welcomeText = "Your Study, Our Priority".split("");

function WelcomePage() {
    const [textAnimationDone, setTextAnimationDone] = useState(false);
    const [showText, setShowText] = useState(false); // <- NEW
    const navigate = useNavigate();
  
    useEffect(() => {
      // Start text animation only after emoji animation
      const emojiAnimationDuration = emojis.length * 0.3 + 0.5;
      const timeout = setTimeout(() => {
        setShowText(true);
      }, emojiAnimationDuration * 1000);
  
      return () => clearTimeout(timeout);
    }, []);
  
    useEffect(() => {
      if (textAnimationDone) {
        setTimeout(() => {
          navigate("/homepage");
        }, 1500); // Redirect after text animation
      }
    }, [textAnimationDone]);
  
    return (
      <>
        {/* Emoji Animation */}
        <div className="relative flex flex-col items-center justify-center mt-64">
          {emojis.map((emoji, index) => (
            <motion.img
              key={index}
              src={emoji}
              alt={`emoji-${index}`}
              className="absolute"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 2, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                delay: index * 0.3,
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                height: "150px",
                width: "200px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
  
        {/* Show text only after emoji animation is complete */}
        {showText && (
          <div className="flex items-center justify-center mt-48 px-4 z-20 relative">
            <motion.div
              className="text-4xl md:text-5xl text-blue-900 font-extrabold text-center flex flex-wrap justify-center"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => setTextAnimationDone(true)}
            >
              {welcomeText.map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.4 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        )}
      </>
    );
  }
  export default WelcomePage;