import Header from '../Components/header';
import Footer from '../Components/footer';
import React from 'react';


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Main Content, flex-1 to fill the space */}
      <main className="flex-1">
        {/* Entry Section, relative position to be moved t,r,l,b  , py padding, overflow not to go over container */}
        <section className="relative text-white py-20 overflow-hidden">
          {/* Video Background, abs to pos nearest relative, at top left corner, width and height full, obj cover ensures entire contianer is covered */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="S1Main.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay, for readabilty  */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
          {/*z places stuff above vid and overlay*/}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome To My Domain
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              This website is mainly built using typescript and the next js framework. 
              The specified will serve as a portfolio to display my achievements.
            </p>
          </div>
        </section>
        {/* Section 3 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              <span>Take a look at some</span><br />
              <span>of</span><br />
              <span>the work I've done</span>
            </h2>
            {/* Section 3 making 3 col 1 row*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/*group enables gp hover, round on large border, medium shadowing, hiden content that overflows, smooth trans, hover scale slighty make bigger on hover */}
              <div className="group rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <a href="/" className="block relative">
                  <img src="/CapstoneImg.png" alt="Capstone Development" className="w-full h-64 object-cover" />
                    {/* inset sets t,r,b,k to 0,parent fills, opac for transparent, when group hover then opac, */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">Capstone Development</h3>
                    </div>
                </a>
              <p className="mt-4 text-gray-700 text-center">The Capstone project was for the development of a web application while working with a stakeholder.</p>
              </div>

              
              <div className="group rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <a href="/" className="block relative">
                  <img src="/AiImg.png" alt="Ai Development" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">Ai Model Development</h3>
                    </div>
                </a>
              <p className="mt-4 text-gray-700 text-center">Different Ai Models that I've developed overtime. Currently( Img classifier & Expression Classifer) .</p>
              </div>
              
              <div className="group rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <a href="/" className="block relative">
                  <img src="/ChessImg.png" alt="Capstone Development" className="w-full h-64 object-contain bg-gray-900" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">Chess</h3>
                    </div>
                </a>
              <p className="mt-4 text-gray-700 text-center">A chess game development project using C++ and SFML.</p>
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

export default LandingPage;

