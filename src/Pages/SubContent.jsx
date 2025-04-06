import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const SubContent = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { subjectId } = location.state || {}; // Get the subject ID from the state
  const className = localStorage.getItem("studentclass");

  const [moduleData, setModuleData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!subjectId || !className) {
        console.error("No subject ID or class name provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://devclash-backend.onrender.com/api/module/${subjectId}/${className}`);
        console.log("API Response:", response.data); // Log the response data
        setModuleData(response.data); // Set the response data directly
      } catch (error) {
        console.error('Error fetching module data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [subjectId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!moduleData.length) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-semibold">No Modules Available</h2>
        <p className="text-gray-600">It seems there are no modules available for this subject. Please check back later!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Modules</h1>
      <h2 className="text-2xl font-semibold mb-4">Resources</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moduleData.map((module) => (
          <div key={module._id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{module.name}</h3>
            <button
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate('/practisetest', { state: { moduleId: module._id, resources: module.resources } })}
            >
              Practice Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubContent;