import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './components/ThemeProvider';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import BookDetailsPage from './pages/BookDetailsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MyCollectionPage from './pages/MyCollectionPage';
import EbookReaderPage from './pages/EbookReaderPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/my-collection" element={<MyCollectionPage />} />
            <Route path="/read-ebook/:id" element={<EbookReaderPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;