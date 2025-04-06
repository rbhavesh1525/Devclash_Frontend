import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Youtube, Info, DollarSign } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DataShow from "./DataShow";

const sampleData = [
  {
    id: 1,
    title: "React for Beginners",
    views: 800,
    purchases: 240,
    link: "https://youtube.com",
    description: "Introduction to React fundamentals",
    price: 299,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    views: 1200,
    purchases: 540,
    link: "https://youtube.com",
    description: "Deep dive into JavaScript ES6+ features",
    price: 499,
  },
];

const UploadVideo = () => {
  const [courses, setCourses] = useState(sampleData);
  const [form, setForm] = useState({
    title: "",
    link: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      ...form,
      id: courses.length + 1,
      views: Math.floor(Math.random() * 1000),
      purchases: Math.floor(Math.random() * 500),
    };
    setCourses([...courses, newCourse]);
    setForm({ title: "", link: "", description: "", price: "" });
  };
  <DataShow/>

  return (
    <>
   
    <div className="bg-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
        Instructor Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 p-6 rounded-xl shadow-md max-w-4xl mx-auto mb-10 p-20"
      >
        <div className="grid md:grid-cols-1 gap-4 ">
          <div className="flex items-center gap-2">
            <Youtube className="text-orange-500" />
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Course Title"
              required
              className="w-full p-2 rounded border border-blue-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <Upload className="text-orange-500" />
            <input
              type="text"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="YouTube Link / Video URL"
              required
              className="w-full p-2 rounded border border-blue-300"
            />
          </div>
          <div className="col-span-2 flex items-start gap-2">
            <Info className="text-orange-500 mt-2" />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Course Description"
              required
              className="w-full p-2 rounded border border-blue-300"
              rows="3"
            />
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="text-orange-500" />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full p-2 rounded border border-blue-300"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
  <button
    type="submit"
    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300 cursor-pointer"
  >
    Add Course
  </button>
</div>

      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-blue-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-orange-500 font-semibold mb-4">₹{course.price}</p>
            <a
              href={course.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            >
              Watch Video
            </a>
            <div className="grid grid-cols-2 gap-64 mt-6">
              <div className="flex flex-col items-center">
                <CircularProgressbar
                  value={(course.views / 1500) * 100}
                  text={`${course.views} views`}
                  styles={buildStyles({
                    textColor: "#1E3A8A",
                    pathColor: "#1E3A8A",
                    trailColor: "#E0E7FF",
                  })}
                />
              </div>
              <div className="flex flex-col items-center">
                <CircularProgressbar
                  value={(course.purchases / 1000) * 100}
                  text={`${course.purchases} sold`}
                  styles={buildStyles({
                    textColor: "#F97316",
                    pathColor: "#F97316",
                    trailColor: "#FFF7ED",
                  })}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
};

export default UploadVideo;
