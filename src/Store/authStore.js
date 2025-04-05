import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  isAuthenticated: !!localStorage.getItem("token"),

  // Login function
  login: (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));


    set({
      user: userData,
      token,
     
      isAuthenticated: true,
    });

    console.log("Login Successful:", token);
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    

    set({ user: null, token: null,  isAuthenticated: false });
    console.log("Logout Successful");
  },
}));

export default useAuthStore;
