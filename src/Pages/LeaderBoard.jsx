import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://devclash-backend.onrender.com/api/profile/leaderboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-10">Leaderboard</h1>
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4 text-center">Total Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaderboardData.map((student, index) => (
              <tr
                key={student._id}
                className="hover:bg-orange-50 transition duration-150"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 text-gray-700">
                  {student.userId.firstname} {student.userId.lastname}
                </td>
                <td className="px-6 py-4 text-center text-gray-900 font-semibold">
                  {student.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
