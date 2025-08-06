"use client";
import React, { useState } from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import FileUpload from '../Components/fileupload';
import ApiStatus from '../Components/statusaiapi';
import { usePokemonPrediction } from '../api/customHook/route';

const AiModel: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { prediction, loading, error, predict, reset } = usePokemonPrediction();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    reset(); // Clear previous results when a new file is selected
  };

  const handlePredict = async () => {
    if (!selectedFile) return;
    try {
      await predict(selectedFile);
    } catch (err) {
      // Error is already handled in the hook
      console.error('Prediction failed:', err);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/AiBg.jpg')`
      }}
    >
      {/* Header */}
      <Header />

      {/* AI Precision Info Box */}
      <div className="absolute top-20 right-8 z-20 bg-black bg-opacity-60 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium">
        This AI Model has a <span className="text-green-400 font-bold">68.06%</span> overall accuracy
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-2">
            Welcome to My Personal Made AI Image Identifier for Gen 1 Pokemons 
          </h1>
          <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* API Status - floating at top */}
        <div className="mb-6 p-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg">
          <div className="text-white font-semibold mb-2">API Status:</div>
          <ApiStatus />
        </div>
        
        <div className="relative max-w-lg w-full">
          {/* Backdrop blur overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl"></div>
          
          {/* Upload Section */}
          <div className="relative z-10 p-6">
            <div className="mb-6">
              <FileUpload 
                onFileSelect={handleFileSelect}
                accept="image/*"
                maxSizeMB={10}
                disabled={loading}
              />
            </div>
            
            {/* Predict Button */}
            {selectedFile && (
              <div className="text-center mb-6">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors shadow-lg"
                >
                  {loading ? 'Predicting...' : 'Predict Pokemon'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-500 bg-opacity-90 backdrop-blur-sm border border-red-400 text-white rounded-lg max-w-lg w-full">
            <h3 className="font-semibold">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {prediction && (
          <div className="mt-8 p-6 bg-black bg-opacity-70 backdrop-blur-sm rounded-2xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Prediction Results</h2>
            
            <div className="space-y-6 text-white">
              {/* Main Prediction */}
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {prediction.predicted_pokemon}
                </div>
                <div className="text-xl">
                  Confidence: <span className="text-green-400 font-semibold">
                    {(prediction.confidence * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
              
              {/* Pokemon Details */}
              {prediction.pokemon_info && (
                <div className="bg-white bg-opacity-10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-center text-blue-300">
                    Pokemon Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-blue-300 font-semibold">Name:</span>
                        <span className="ml-2 font-medium text-yellow-300">
                          {prediction.pokemon_info.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-300 font-semibold">Types:</span>
                        <span className="ml-2 font-medium text-green-300">
                          {prediction.pokemon_info.types}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-300 font-semibold">Height:</span>
                        <span className="ml-2 font-medium text-purple-300">
                          {prediction.pokemon_info.height}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-300 font-semibold">Weight:</span>
                        <span className="ml-2 font-medium text-orange-300">
                          {prediction.pokemon_info.weight}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-300 font-semibold">Habitat:</span>
                        <span className="ml-2 font-medium text-pink-300">
                          {prediction.pokemon_info.habitat}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center items-start">
                      {prediction.pokemon_info.sprite_url && (
                        <div className="text-center">
                          <img
                            src={prediction.pokemon_info.sprite_url}
                            alt={`${prediction.pokemon_info.name} sprite`}
                            className="w-32 h-32 mx-auto mb-2 bg-white bg-opacity-20 rounded-lg p-2"
                          />
                          <p className="text-sm text-gray-300">Official Sprite</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mt-6">
                    <div className="text-blue-300 font-semibold mb-2">Description:</div>
                    <p className="text-sm text-white leading-relaxed bg-black bg-opacity-50 p-4 rounded-lg border border-gray-600">
                      {prediction.pokemon_info.flavor_text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AiModel;
