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
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
              Capstone Project
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Welcome to my Capstone project page. Here you can find detailed information 
                about the web application development project I worked on with a stakeholder.
              </p>
              {/* Add your capstone content here */}
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