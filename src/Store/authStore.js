import { Sidebar } from "lucide-react";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  studentid : localStorage.getItem("studentid")||null,
  isAuthenticated: !!localStorage.getItem("token"),

  // Login function
  login: (userData, token,studentid) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("studentid",studentid);


    set({
      user: userData,
      token,
     studentid:studentid,
      isAuthenticated: true,
    });

    console.log("Login Successful:", token);
    console.log("sid in store ",studentid)
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("studentid");
    

    set({ user: null, token: null,  isAuthenticated: false,studentid:false });
    console.log("Logout Successful");
  },
}));

export default useAuthStore;
