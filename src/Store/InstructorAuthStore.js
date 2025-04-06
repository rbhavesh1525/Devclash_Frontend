import { create } from "zustand";



// Store/InstructorAuthStore.js

const useInstructorAuthStore = create((set) => ({
  instructor: null,
  instructorId: null,
  token: null,
  paperId: null,

  setInstructor: (data) => {
    localStorage.setItem("instructorData", JSON.stringify(data));
    console.log("data me hai kya ?",data)
    set({
      instructor: data,
      instructorId: data._id,
      token: data.token,
      paperId: data.paperId || null,
    });
  },

  setPaperId: (paperId) => {
    console.log("📌 setPaperId called with:", paperId);
    set({ paperId });
  
    const storedData = localStorage.getItem("instructorData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      parsed.paperId = paperId;
      localStorage.setItem("instructorData", JSON.stringify(parsed));
    }
  },

  logout: () => {
    localStorage.removeItem("instructorData");
    set({ instructor: null, instructorId: null, token: null, paperId: null });
  },

  loadFromLocalStorage: () => {
    const storedData = localStorage.getItem("instructorData");
    if (storedData) {
      const data = JSON.parse(storedData);
      set({
        instructor: data,
        instructorId: data._id,
        token: data.token,
        paperId: data.paperId || null, // 👈 Yeh line add kar
      });
    }
  },
}));


export default useInstructorAuthStore;
