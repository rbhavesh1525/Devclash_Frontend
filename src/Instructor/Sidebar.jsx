// Sidebar.jsx
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {


  const navigate = useNavigate();
const handlelogout =()=>{
  localStorage.removeItem('token');
  navigate('/instructor-homepage')
}



  return (
    <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-56 bg-gray-900 text-white shadow-lg z-40 flex flex-col justify-between px-6 pt-10">
      <div className="space-y-5">
        <div className="cursor-pointer hover:bg-gray-800 hover:text-orange-500 p-3 rounded-md transition">Dashboard</div>
        <div className="cursor-pointer hover:bg-gray-800 hover:text-orange-500 p-3 rounded-md transition">Courses</div>
        <div className="cursor-pointer hover:bg-gray-800 hover:text-orange-500 p-3 rounded-md transition">Test</div>
        <div className="cursor-pointer hover:bg-gray-800  hover:text-orange-500 p-3 rounded-md transition">Result</div>
      </div>
      <div className="mb-6 text-red-400 hover:text-red-600 flex items-center gap-2 cursor-pointer" onClick={handlelogout}>
        <LogOut size={20} /> Logout
      </div>
    </div>
  );
}

export default Sidebar;
