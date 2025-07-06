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
        {/* Entry Section */}
        <section className="bg-[url('/S1Main.jpg')] bg-cover bg-center text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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