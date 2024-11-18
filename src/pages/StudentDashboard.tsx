import { Award, Book, TrendingUp, Trophy } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from '../components/Layout';

const StudentDashboard: React.FC = () => {
  const monthlyReadingData = [
    { name: 'Jan', books: 3 },
    { name: 'Feb', books: 5 },
    { name: 'Mar', books: 4 },
    { name: 'Apr', books: 6 },
    { name: 'May', books: 8 },
    { name: 'Jun', books: 7 },
  ];

  const genreData = [
    { name: 'Fiction', books: 15 },
    { name: 'Non-Fiction', books: 10 },
    { name: 'Sci-Fi', books: 8 },
    { name: 'Mystery', books: 12 },
    { name: 'Biography', books: 5 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Books Card */}
          {/* bg-secondary text-secondary-foreground p-6 rounded-lg shadow-md" */}
          <div className="bg-secondary text-secondary-foreground dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Books Read</h3>
              <Book className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">50</p>
          </div>

          {/* Streak Card */}
          <div className="bg-secondary text-secondary-foreground dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">15 days</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Longest streak: 30 days</p>
          </div>

          {/* Rank Card */}
          <div className="bg-secondary text-secondary-foreground dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rank</h3>
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">Bookworm</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">1250 points</p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Bookworm</span>
                <span>Bibliophile</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ width: '83%' }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">250 points to next rank</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Reading Progress */}
          <div className="bg-secondary text-secondary-foreground dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Monthly Reading Progress</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Number of books read per month</p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyReadingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="books" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Books by Genre */}
          <div className="bg-secondary text-secondary-foreground dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Books Read by Genre</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Distribution of books across genres</p>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="books" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <p className="font-medium">Reading Streak Master</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Maintained a 15-day reading streak</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="font-medium">Genre Explorer</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Read books from 5 different genres</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="font-medium">Speed Reader</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Read 8 books in a single month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;