import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock10, Rocket } from "lucide-react";

function getNextSunday() {
  const today = new Date();
  const day = today.getDay();
  const diff = (7 - day) % 7;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + diff);
  nextSunday.setHours(10, 0, 0, 0); // 10 AM
  return nextSunday;
}

const UpcomingTestCountdown = ({ onStart }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextSunday = getNextSunday();
      const diff = nextSunday - now;

      if (diff <= 0) {
        setTimeLeft("🟢 Test is LIVE now!");
        setIsLive(true);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        setIsLive(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-3xl shadow-xl p-8 max-w-xl mx-auto mt-10 text-center"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex justify-center items-center gap-3 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <Clock10 className="w-8 h-8 text-blue-700" />
        <h2 className="text-3xl font-bold text-blue-900">Next Test Countdown</h2>
      </motion.div>

      <motion.p
        className="text-2xl font-semibold text-blue-800 mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ⏳ {timeLeft}
      </motion.p>

      {isLive && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-4 flex items-center gap-2 bg-green-600 text-white text-lg px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
        >
          <Rocket className="w-5 h-5" />
          Start Test
        </motion.button>
      )}
    </motion.div>
  );
};

export default UpcomingTestCountdown;
