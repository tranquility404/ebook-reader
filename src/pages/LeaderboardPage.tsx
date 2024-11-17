import React from 'react';
import Layout from '../components/Layout';
import { Award, Info } from 'lucide-react';

interface LeaderboardEntryProps {
  rank: number;
  username: string;
  points: number;
  country: string;
}

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ rank, username, points, country }) => (
  <div className="flex items-center justify-between bg-secondary text-secondary-foreground p-4 rounded-md mb-2">
    <div className="flex items-center">
      <span className="font-bold text-lg mr-4">{rank}</span>
      <span>{username}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-4">{points} points</span>
      <img src={`https://flagcdn.com/24x18/${country.toLowerCase()}.png`} alt={`${country} flag`} className="w-6 h-4" />
    </div>
  </div>
);

const LeaderboardPage: React.FC = () => {
  const leaderboardData = [
    { rank: 1, username: "bookworm123", points: 5000, country: "us" },
    { rank: 2, username: "readingenthusiast", points: 4800, country: "gb" },
    { rank: 3, username: "literaturelover", points: 4600, country: "ca" },
    { rank: 4, username: "pageturner", points: 4400, country: "au" },
    { rank: 5, username: "booknerd", points: 4200, country: "de" },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {leaderboardData.map((entry) => (
            <LeaderboardEntry key={entry.rank} {...entry} />
          ))}
        </div>
        <div>
          <div className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Info size={24} className="mr-2" />
              Ranking System
            </h2>
            <p className="mb-4">
              Our ranking system is based on the points you earn through various activities on the platform. Here's how you can climb the ranks:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Reading books: 10 points per page</li>
              <li>Completing quizzes: 50-100 points based on score</li>
              <li>Writing reviews: 200 points</li>
              <li>Maintaining reading streaks: 50 points per day</li>
            </ul>
          </div>
          <div className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Award size={24} className="mr-2" />
              Rewards
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-semibold">Bronze Tier (0-1000 points)</h3>
                <p>Access to basic features</p>
              </li>
              <li>
                <h3 className="font-semibold">Silver Tier (1001-5000 points)</h3>
                <p>Unlock AI book summaries</p>
              </li>
              <li>
                <h3 className="font-semibold">Gold Tier (5001-10000 points)</h3>
                <p>Unlock chat bot and personalized recommendations</p>
              </li>
              <li>
                <h3 className="font-semibold">Platinum Tier (10001+ points)</h3>
                <p>Unlock all premium features and early access to new releases</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;