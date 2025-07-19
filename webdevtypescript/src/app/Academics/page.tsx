import React from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import Link from 'next/link';

const Academics: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* First Section - 60/40 Split */}
        <section className="h-[28rem] flex flex-col md:flex-row">
          {/* Left Side - 60% Text Content */}
          <div className="md:w-3/5 w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                🎓 Academic Background
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl font-bold mr-2">•</span>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    Bachelor of Engineering in Software Engineering<br />
                    <span className="text-sm text-gray-600">Concordia University</span>
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl font-bold mr-2">•</span>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    DEC in Pure and Applied Sciences<br />
                    <span className="text-sm text-gray-600">Vanier College</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side - 40% Image */}
          <div className="md:w-2/5 w-full relative overflow-hidden">
            <img 
              src="/Acad.png" 
              alt="Academic Background" 
              className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </section>

        {/* Section 2 Academic Details */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Name */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Software Engineering Program
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
              Comprehensive four-year program focusing on software development, system design, 
              and engineering principles. Emphasis on practical application through projects 
              and collaborative learning experiences.
            </p>
            
            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left Column */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                
                <div className="space-y-2">
                  <p className="text-gray-700">COMP 232 Mathematics for Computer Science</p>
                  <p className="text-gray-700">COMP 248 Object-Oriented Programming I</p>
                  <p className="text-gray-700">ENGR 201 Professional Practice and Responsibility</p>
                  <p className="text-gray-700">GEOG 2XX General Education Elective  </p>
                  <p className="text-gray-700">COMP 249 Object-Oriented Programming II</p>
                  <p className="text-gray-700">ENGR 233 Applied Advanced Calculus </p>
                  <p className="text-gray-700">SOEN 228 System Hardware </p>
                  <p className="text-gray-700">SOEN 287 Web Programming</p>
                  <p className="text-gray-700">PHYS 284 Engineering and Natural Science Group</p>
                  <p className="text-gray-700">COMP 348 Principles of Programming Languages </p>
                  <p className="text-gray-700">COMP 352 Data Structures and Algorithms </p>
                  <p className="text-gray-700">ENCS 282 Technical Writing and Communication</p>
                  <p className="text-gray-700">ENGR 202 Sustainable Development and Environmental Stewardship</p>
                  <p className="text-gray-700">SOEN 341 Software Process and Practices </p>
                  <p className="text-gray-700">COMP 346 Operating Systems</p>
                  <p className="text-gray-700">ELEC 275 Principles of Electrical Engineering</p>
                  <p className="text-gray-700">ENGR 371 Probability and Statistics in Engineering</p>
                  <p className="text-gray-700">SOEN 331 Formal Methods for Software Engineering</p>
                  <p className="text-gray-700">COMP 345 Advanced Program Design with C++</p>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                
                <div className="space-y-2">
                  <p className="text-gray-700">COMP 335 Introduction to Theoretical Computer Science</p>
                  <p className="text-gray-700">ENGR 391 Numerical Methods in Engineering</p>
                  <p className="text-gray-700">SOEN 342 Software Requirements and Deployment</p>
                  <p className="text-gray-700">SOEN 343 Software Architecture and Design </p>
                  <p className="text-gray-700">SOEN 384 Management, Measurement and Quality Control </p>
                  <p className="text-gray-700">SOEN 363 Data Systems for Software Engineer</p>
                  <p className="text-gray-700">SOEN 345 Software Testing, Verification and Quality Assurance</p>
                  <p className="text-gray-700">SOEN 357 User Interface Design</p>
                  <p className="text-gray-700">SOEN 390 Software Engineering Team Design Project</p>
                  <p className="text-gray-700">SOEN 385 Control Systems and Applications </p>
                  <p className="text-gray-700">ENGR 301 Engineering Management Principles and Economics  </p>
                  <p className="text-gray-700">SOEN 321 Information Systems Security  </p>
                  <p className="text-gray-700">ENGR 392 Impact of Technology on Society </p>
                  <p className="text-gray-700">COMP 472 Artificial Intelligence </p>
                  <p className="text-gray-700">SOEN 387 Web‑Based Enterprise Application Design </p>
                  <p className="text-gray-700">SOEN 490 Capstone Software Engineering Design Project  </p>
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Skills Acquired</h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Through rigorous coursework and hands-on projects, I have developed proficiency in 
                multiple programming languages including Java, Python, JavaScript, C++, and more. 
                Additionally, I have gained experience with frameworks like React, Next.js, Pytorch, 
                and various database technologies including SQL, MongoDB and NoSQL systems.
              </p>
            </div>
          </div>
        </section>
        {/* Section 3 */}
        <section className="relative py-16 bg-[url('/AcadS3.png')] bg-cover bg-center bg-no-repeat">
          {/* overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Middle Text */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Academic Projects
            </h2>
            
            {/* 4 Rectangles at Center - 2 per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Rectangle 1 */}
              <Link href="/">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg
              hover:shadow-xl hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer">
                
                <p className="text-gray-700 font-medium">SQL</p>
              </div>
              </Link>
              
              {/* Rectangle 2 */}
              <Link href="/Capstone">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg
              hover:shadow-xl hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer">              
                <p className="text-gray-700 font-medium">Capstone</p>
              </div>
              </Link>
              
              {/* Rectangle 3 */}
              <Link href="/">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg
              hover:shadow-xl hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer">
                <p className="text-gray-700 font-medium">JAVA</p>
              </div>
              </Link>
              {/* Rectangle 4 */}
              <Link href="/AiModel">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg
              hover:shadow-xl hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer">               
                <p className="text-gray-700 font-medium">AiDevelopment</p>
              </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Academics;