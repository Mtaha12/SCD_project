import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartPage() {
  const [news, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/articles', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        setArticles(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch news articles: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: news.map((article, index) => `Article ${index + 1}`),
    datasets: [
      {
        label: "News Articles",
        data: news.map((_, index) => index + 1),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Geo News Article Distribution',
        font: {
          size: 24,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Articles',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Articles',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
        grid: {
          color: '#ddd',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="text-xl text-gray-600">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-xl text-red-600">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default ChartPage; 