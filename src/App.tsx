import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import BookDetailsPage from './pages/BookDetailsPage';
import EbookReaderPage from './pages/EbookReaderPage';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import LandingPage from './pages/LandingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import MyCollectionPage from './pages/MyCollectionPage';
import ProfilePage from './pages/ProfilePage';
import StudentDashboard from './pages/StudentDashboard';

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
            <Route path="/leaderboard-info" element={<InfoPage/>} />
            <Route path='/profile/:uid' element={ <ProfilePage /> } />

            <Route path="/my-collection" element={<MyCollectionPage />} />
            <Route path="/read-ebook/:id" element={<EbookReaderPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;