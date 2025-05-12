import React from 'react';

function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Welcome to Geo News Visualizer</h1>
      <p className="mb-8 text-lg text-gray-600">Explore news data visually and in list form.</p>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="space-y-4 text-left">
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">•</span>
            Interactive chart visualization of news data
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">•</span>
            Detailed news article listings
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">•</span>
            Real-time data updates
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home; 