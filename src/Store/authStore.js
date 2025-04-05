import { Sidebar } from "lucide-react";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  studentid : localStorage.getItem("studentid")||null,
  studentclass: localStorage.getItem("studentclass")||null,
  
  isAuthenticated: !!localStorage.getItem("token"),

  // Login function
  login: (userData, token,studentid,studentclass) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("studentid",studentid);
    localStorage.setItem("studentclass",studentclass);
    alert(studentclass);


    set({
      user: userData,
      token,
     studentid:studentid,
     studentclass:studentclass,
      isAuthenticated: true,

    });

    console.log("Login Successful:", token);
    console.log("sid in store ",studentid)
    console.log("classname is store",studentclass)
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("studentid");
    localStorage.removeItem("studentclass")
    

    set({ user: null, token: null,  isAuthenticated: false,studentid:false });
    console.log("Logout Successful");
  },
}));

export default useAuthStore;
