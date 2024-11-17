import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Book, MessageCircle, HelpCircle, BookOpen, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <section className="text-center py-20">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to EbookReader
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-muted-foreground"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover a new way to read and learn with our AI-powered ebook platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/signup"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Book size={40} />}
            title="AI Book Summaries"
            description="Get instant summaries of your favorite books powered by AI."
          />
          <FeatureCard
            icon={<MessageCircle size={40} />}
            title="Chat Bot"
            description="Discuss books and get recommendations from our AI chat bot."
          />
          <FeatureCard
            icon={<HelpCircle size={40} />}
            title="Quiz Section"
            description="Test your knowledge with AI-generated quizzes for each book."
          />
          <FeatureCard
            icon={<BookOpen size={40} />}
            title="Embedded Reader"
            description="Read your ebooks directly within our platform with our feature-rich reader."
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="Reader Community"
            description="Connect with other readers, share insights, and participate in book clubs."
          />
        </div>
      </section>

      <section className="text-center py-20 bg-secondary text-secondary-foreground">
        <h2 className="text-3xl font-bold mb-6">Ready to start your reading journey?</h2>
        <p className="text-xl mb-8 text-muted-foreground">
          Join thousands of readers who have already discovered the power of AI-enhanced reading.
        </p>
        <Link
          to="/signup"
          className="bg-accent text-accent-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300"
        >
          Sign Up Now
        </Link>
      </section>
    </Layout>
  );
};

export default LandingPage;