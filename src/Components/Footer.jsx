import React from "react";
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-10 border-t">
      {/* Social Icons Top Centered */}
      <div className="flex justify-center mb-8 gap-6">
  <div className="w-10 h-10 border-2 border-dotted border-black rounded-full flex items-center justify-center">
    <FaYoutube size={20} className="text-red-600" />
  </div>
  <div className="w-10 h-10 border-2 border-dotted border-black rounded-full flex items-center justify-center">
    <FaInstagram size={20} className="text-pink-500" />
  </div>
  <div className="w-10 h-10 border-2 border-dotted border-black rounded-full flex items-center justify-center">
    <FaFacebookF size={20} className="text-blue-600" />
  </div>
</div>


      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Left - Contact Info */}
        <div className="space-y-2">
          <h2 className="font-bold text-lg leading-tight">
            Kingdom <br /> Domain <br /> College
          </h2>
          <p className="text-sm font-semibold">
            <span className="font-bold">ADDRESS:</span> 9719 LINCOLN VILLAGE DR SUITE 600<br />
            SACRAMENTO, CA 95827
          </p>
          <p className="text-sm"><span className="font-bold">PHONE:</span> (916) 472-0847</p>
          <p className="text-sm"><span className="font-bold">EMAIL:</span> INFO@KDCGLOBAL.ORG</p>
        </div>

        {/* Right - Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm text-gray-800">
          <div>
            <h3 className="font-bold mb-2">ABOUT</h3>
            <ul className="space-y-1">
              <li>Vision</li>
              <li>Culture</li>
              <li>Instructors</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">ADMISSIONS</h3>
            <ul className="space-y-1">
              <li>Finances</li>
              <li>How To Pay</li>
              <li>Calendar</li>
              <li>Apply Now</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">ACADEMICS</h3>
            <ul className="space-y-1">
              <li>1st Year</li>
              <li>2nd Year</li>
              <li>3rd Year</li>
              <li>All Academics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">STUDENT LIFE</h3>
            <ul className="space-y-1">
              <li>Sacramento Living</li>
              <li>Stories & News</li>
              <li>Student Handbook</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-10 text-gray-700">
        ©2023 <span className="font-bold">KINGDOM DOMAIN COLLEGE</span>. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
