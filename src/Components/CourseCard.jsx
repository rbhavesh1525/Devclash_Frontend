import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { motion } from 'framer-motion';

const CourseCard = ({ title, description, thumbnail, onLearnMore, onPreAssessment }) => {
  return (
    <section id="courses">
    <motion.div
      className="bg-white rounded-2xl shadow-lg transition-all relative overflow-hidden flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <div className="flex justify-between p-4">
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold"
          onClick={onLearnMore} // Use the passed function
        >
          Learn More
        </button>
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
          onClick={onPreAssessment} // Use the passed function
        >
          Pre-Assessment Test
        </button>
      </div>
    </motion.div>
    </section>
  );
};

// Define prop types for the CourseCard component
CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  onLearnMore: PropTypes.func.isRequired, // Updated prop type
  onPreAssessment: PropTypes.func.isRequired, // Updated prop type
};

export default CourseCard;