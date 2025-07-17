import React from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';

const Capstone: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Section 1 */}
        <section className="relative h-96 bg-[url('/CapstoneBg.jpg')] bg-cover bg-center bg-no-repeat">
          {/*overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Center Text */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Capstone Project
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                A comprehensive web application developed in collaboration with real-world stakeholders, 
                demonstrating practical software engineering skills and industry best practices.
              </p>
              <div className="text-lg md:text-xl font-semibold">
                Full-Stack Development | Team Collaboration | Stakeholder Management
              </div>
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className="py-16 bg-gradient-to-br from-black via-red-900 to-black text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Name */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
              Capstone Development
            </h2>
            
            {/* Description */}
            <p className="text-lg text-white text-center mb-12 max-w-3xl mx-auto leading-relaxed">
              Heres some of my contributions to the development of the web application.
            </p>

            
            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left Column */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                
                <div className="space-y-2">
                  <p className="text-gray-700">Description</p>
                  <p className="text-gray-700">Description</p>
    


                </div>
              </div>
              
              {/* Right Column */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                
                <div className="space-y-2">
                  <p className="text-gray-700">Description</p>
                  <p className="text-gray-700">Description</p>
                </div>
              </div>
            </div>
            
           
          </div>
        </section>
        {/* Section 3  */}
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Text  */}
            <div className="mb-16">
              <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">
                Demo
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Experience our platform in action. Watch how seamlessly our solution 
                integrates with your workflow, delivering powerful results with 
                intuitive simplicity. See the difference that cutting-edge technology 
                can make for your business.
              </p>
            </div>

            {/* Video Container  */}
            <div className="flex justify-center">
              <div className="relative group">
                {/* Video Placeholder */}
                <div className="relative w-[800px] h-[450px] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700 group-hover:shadow-purple-500/20 transition-all duration-300">
                  {/* Video Element */}
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="/api/placeholder/800/450"
                  >
                    <source src="/your-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Overlay for styling */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Capstone;