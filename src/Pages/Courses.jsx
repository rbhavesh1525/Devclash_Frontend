import React, { useEffect, useState } from 'react';
import CourseCard from '../Components/CourseCard'; // Ensure the path is correct
import axios from 'axios'; // Import axios for API calls

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://devclash-backend.onrender.com/api/subject');
        console.log("mydata", response.data);
        setCourses(response.data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">STEM Courses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course._id} 
              title={course.name} 
              description={course.tagline} 
              thumbnail={course.thumbnail} 
              onClick={() => console.log(`Navigating to ${course.name}`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;