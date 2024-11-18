import { Menu, Moon, Sun, User, X } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      {/* <ThemeTransition /> */}
      <header className="bg-secondary text-secondary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            EbookReader
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link to="/home" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-collection" className="hover:text-primary transition-colors">
                  My Collection
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-foreground">
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <Link to="/dashboard" className="text-foreground">
              <User size={24} />
            </Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-secondary text-secondary-foreground p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="block hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-collection" className="block hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  My Collection
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="block hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <main className="container mx-auto px-4 py-8 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;