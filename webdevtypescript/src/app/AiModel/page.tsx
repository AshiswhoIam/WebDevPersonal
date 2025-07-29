"use client";
import React, { useState } from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';

const AiModel: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className="min-h-[180vh] flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/AiBg.jpg')`
      }}
    >
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-2">
              Welcome to My Personal Made AI Image Identifier
            </h1>
            <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            {/* Backdrop blur overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl"></div>
            
            {/* Upload Square */}
            <div 
              className={`relative z-10 w-80 h-80 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50 bg-opacity-30' 
                  : 'border-gray-400 bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              {uploadedImage ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded Pokemon" 
                    className="max-w-full max-h-64 object-contain rounded-lg shadow-lg"
                  />
                  <button 
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add prediction logic here
                      console.log('Predicting Pokemon...');
                    }}
                  >
                    Predict Pokemon
                  </button>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="mb-4">
                    <svg 
                      className="w-16 h-16 mx-auto text-gray-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 drop-shadow-sm">
                    Upload Pokemon Image
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 drop-shadow-sm">
                    Upload any of the first gen 1 Pokemon<br />
                    to try and see the prediction
                  </p>
                  <div className="text-sm text-gray-600 drop-shadow-sm">
                    <p>Drag and drop your image here or</p>
                    <p className="font-medium text-blue-600">click to browse</p>
                  </div>
                </div>
              )}
              
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
  );
};

export default AiModel;