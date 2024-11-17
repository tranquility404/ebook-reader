import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Book, User, Tag, BarChart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock book data (replace with actual data fetching in a real application)
  const book = {
    id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic Literature',
    readCount: 1500,
    coverUrl: '/placeholder.svg?height=400&width=300',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
  };

  const similarBooks = [
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: '3', title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: '4', title: '1984', author: 'George Orwell' },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <div className="flex items-center mb-4">
            <User size={20} className="mr-2" />
            <span className="text-lg">{book.author}</span>
          </div>
          <div className="flex items-center mb-4">
            <Tag size={20} className="mr-2" />
            <span>{book.category}</span>
          </div>
          <div className="flex items-center mb-6">
            <Book size={20} className="mr-2" />
            <span>Read by {book.readCount} users</span>
          </div>
          <p className="text-muted-foreground mb-6">{book.description}</p>
          <div className="flex space-x-4">
            <Link to={ `/read-ebook/${id}` }>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Read Now</button>
            </Link>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md flex items-center">
              <BarChart size={20} className="mr-2" />
              Attempt Quiz
            </button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md flex items-center">
              <MessageCircle size={20} className="mr-2" />
              Discuss
            </button>
          </div>
        </div>
        <div>
          <img src={book.coverUrl} alt={book.title} className="w-full rounded-lg shadow-md mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Similar Books</h2>
          <ul className="space-y-2">
            {similarBooks.map((similarBook) => (
              <li key={similarBook.id} className="bg-secondary text-secondary-foreground p-3 rounded-md">
                <h3 className="font-semibold">{similarBook.title}</h3>
                <p className="text-sm text-muted-foreground">{similarBook.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetailsPage;