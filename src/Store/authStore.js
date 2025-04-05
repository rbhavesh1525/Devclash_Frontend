import { Sidebar } from "lucide-react";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  studentid : localStorage.getItem("studentid")||null,
<<<<<<< HEAD
  studentclass: localStorage.getItem("studentclass")||null,
=======
  studentclass : localStorage.getItem("studentclass")||null,
>>>>>>> 6b53a60de6e01266fe8eaa4c6681e58956839c34
  isAuthenticated: !!localStorage.getItem("token"),

  // Login function
  login: (userData, token,studentid,studentclass) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("studentid",studentid);
    localStorage.setItem("studentclass",studentclass);
<<<<<<< HEAD
    alert(studentclass);
=======
>>>>>>> 6b53a60de6e01266fe8eaa4c6681e58956839c34


    set({
      user: userData,
      token,
     studentid:studentid,
     studentclass:studentclass,
      isAuthenticated: true,

    });

    console.log("Login Successful:", token);
    console.log("sid in store ",studentid)
<<<<<<< HEAD
    console.log("classname is store",studentclass)
=======

    console.log(studentclass)
>>>>>>> 6b53a60de6e01266fe8eaa4c6681e58956839c34
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
