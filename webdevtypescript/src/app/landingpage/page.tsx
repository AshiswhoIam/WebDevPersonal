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
              The specified will serve as a portfolio to display achievements.
            </p>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

