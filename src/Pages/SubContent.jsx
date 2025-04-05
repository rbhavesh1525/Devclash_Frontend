import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SubContent = () => {
    const location = useLocation();
    const { subjectId } = location.state || {}; // Get the subject ID from the state
  
    console.log("Received subject ID:", subjectId); // Debug log
  
    const [moduleData, setModuleData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchModuleData = async () => {
        if (!subjectId) {
          console.error("No subject ID provided");
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.get(`https://devclash-backend.onrender.com/api/module/${subjectId}/grade 6`); // Adjust the URL as needed
          setModuleData(response.data);
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

  if (!moduleData) {
    return <div className="text-center">No module data found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">{moduleData.name}</h1>
      <h2 className="text-2xl font-semibold mb-4">Resources</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {moduleData.resources.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col">
      <h2 className="text-xl font-semibold">{resource.name}</h2>
      {resource.articleLinks.length > 0 && (
        <div className="mt-2">
          <h3 className="font-semibold">Articles:</h3>
          <ul className="list-disc pl-5">
            {resource.articleLinks.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {resource.videoLinks.length > 0 && (
        <div className="mt-2">
          <h3 className="font-semibold">Videos:</h3>
          <ul className="list-disc pl-5">
            {resource.videoLinks.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubContent;