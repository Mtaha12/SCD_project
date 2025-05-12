import React, { useEffect, useState } from 'react';

function NewsList() {
  const [news, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/articles');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched news data:', data); // Debug log
        setArticles(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="text-xl text-gray-600">Loading news articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-xl text-gray-600">No news articles found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest News Articles</h2>
        <ul className="space-y-4">
          {news.map((item, idx) => (
            <li key={idx} className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col">
                <strong className="text-xl text-gray-800 mb-2">{item.time}</strong>
                <span className="text-lg text-gray-600">{item.title}</span>
                {item.description && (
                  <p className="mt-2 text-gray-500">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsList; 