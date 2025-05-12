import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ChartPage from './components/ChartPage';
import NewsList from './components/NewsList';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600">{this.state.error?.toString()}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  console.log('App component rendering'); // Debug log

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">Home</Link>
              <Link to="/chart" className="text-gray-700 hover:text-blue-500 font-medium">Chart</Link>
              <Link to="/news" className="text-gray-700 hover:text-blue-500 font-medium">News List</Link>
            </div>
          </nav>
          
          <main className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chart" element={<ChartPage />} />
              <Route path="/news" element={<NewsList />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
