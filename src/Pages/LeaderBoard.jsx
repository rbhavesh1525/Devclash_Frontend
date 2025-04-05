import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchLeaderboardData = async () => {
      // Uncomment the following lines when the backend is ready
      /*
      try {
        const response = await axios.get('https://your-api-url.com/api/leaderboard');
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
      */

      // Dummy data for demonstration
      const dummyData = [
        { _id: '1', name: 'Alice', totalScore: 95 },
        { _id: '2', name: 'Bob', totalScore: 90 },
        { _id: '3', name: 'Charlie', totalScore: 85 },
        { _id: '4', name: 'David', totalScore: 80 },
        { _id: '5', name: 'Eve', totalScore: 75 },
      ];

      setLeaderboardData(dummyData);
      setLoading(false);
    };

    fetchLeaderboardData();
  }, []);

  // Sort the data in descending order based on total score
  const sortedData = [...leaderboardData].sort((a, b) => b.totalScore - a.totalScore);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 p-4">Rank</th>
            <th className="border-b-2 border-gray-300 p-4">Student Name</th>
            <th className="border-b-2 border-gray-300 p-4">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((student, index) => (
            <tr key={student._id}>
              <td className="border-b border-gray-300 p-4">{index + 1}</td>
              <td className="border-b border-gray-300 p-4">{student.name}</td>
              <td className="border-b border-gray-300 p-4">{student.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;