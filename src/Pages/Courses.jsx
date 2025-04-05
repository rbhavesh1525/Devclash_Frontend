import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CourseCard from '../Components/CourseCard'; // Ensure the path is correct
import axios from 'axios'; // Import axios for API calls
import LandingPage from '../Components/LandingPage';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://devclash-backend.onrender.com/api/subject');
        setCourses(response.data); 
        console.log("Mydata",response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleLearnMore = (course) => {
    console.log("Navigating to subject ID:", courses._id); // Debug log
    navigate('/subcontent', { state: { subjectId: course._id } }); // Pass the subject ID
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">STEM Courses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course._id} // Use the unique ID from the backend
              title={course.name} // Course name from the backend
              description={course.tagline} // Tagline from the backend
              thumbnail={course.thumbnail} // Thumbnail image URL
              onClick={() => handleLearnMore(course)} // Navigate to SubContent
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;