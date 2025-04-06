import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Views",
    value: 78,
    total: 100,
    color: "#1E3A8A", // dark blue
  },
  {
    title: "Purchases Till Date",
    value: 60,
    total: 100,
    color: "#F97316", // orange
  },
  {
    title: "Engagement",
    value: 45,
    total: 100,
    color: "#0EA5E9", // sky blue
  },
  {
    title: "Watch Time (hrs)",
    value: 32,
    total: 50,
    color: "#10B981", // green
  },
];

function DataShow () {
  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-10 text-center">
        Course Performance Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="w-32 h-32 mb-4">
              <CircularProgressbar
                value={(stat.value / stat.total) * 100}
                text={`${stat.value}${stat.title === "Watch Time (hrs)" ? "h" : ""}`}
                styles={buildStyles({
                  textColor: stat.color,
                  pathColor: stat.color,
                  trailColor: "#e5e7eb", // light gray
                  textSize: "18px",
                })}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DataShow;
