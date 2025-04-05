import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Sparkles } from 'lucide-react';
import { subjects } from './data';

// SubjectCard Component
const SubjectCard = ({ subject }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front of the card */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:bg-blue-900 hover:text-white cursor-pointer min-h-[200px]"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative w-24 h-24 mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                strokeDasharray={`${subject.progress}, 100`}
              />
              <text
                x="18"
                y="20.35"
                className="fill-current text-lg font-semibold"
                textAnchor="middle"
              >
                {subject.progress}%
              </text>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
          <p className="text-sm opacity-75">Click to see details</p>
        </div>
      </div>

      {/* Back of the card */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:bg-blue-900 hover:text-white cursor-pointer min-h-[200px]"
        onClick={handleClick}
      >
        <h3 className="text-xl font-bold mb-4 text-center">{subject.name} Topics</h3>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subject.subtopics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="progress" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ReactCardFlip>
  );
};

// MasteryChart Component
const MasteryChart = ({ subjects }) => {
  const COLORS = ['#F97316', '#3730A3', '#059669'];

  const data = subjects.map(subject => ({
    name: subject.name,
    value: subject.progress,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Overall Mastery</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Main Dashboard Screen Component
function DashboardScreen  () {
  // TODO: Replace with actual user data from API
  const studentName = "Alex";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {studentName} 👋
            </h1>
            <Sparkles className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-xl text-gray-600">
            Here's your personalized learning dashboard
          </p>
          <p className="text-gray-500 mt-2">
            Track your progress, master STEM, and level up your skills.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        {/* Mastery Chart */}
        <div className="mb-12">
          <MasteryChart subjects={subjects} />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;