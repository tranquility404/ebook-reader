import React from 'react';
import Layout from '../components/Layout';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, coverUrl }) => (
    <Link to={`/book/${id}`} className="block">
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg shadow-md">
            <img src={coverUrl} alt={`${title} cover`} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground">{author}</p>
        </div>
    </Link>
);

const HomePage: React.FC = () => {
    const uploadedBooks = [
        { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverUrl: "/placeholder.svg?height=200&width=150" },
        { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", coverUrl: "/placeholder.svg?height=200&width=150" },
        { id: "3", title: "1984", author: "George Orwell", coverUrl: "/placeholder.svg?height=200&width=150" },
      ];
    
      const lastReadBooks = [
        { id: "4", title: "Pride and Prejudice", author: "Jane Austen", coverUrl: "/placeholder.svg?height=200&width=150" },
        { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", coverUrl: "/placeholder.svg?height=200&width=150" },
      ];
    
      const trendingBooks = [
        { id: "6", title: "Dune", author: "Frank Herbert", coverUrl: "/placeholder.svg?height=200&width=150" },
        { id: "7", title: "The Hobbit", author: "J.R.R. Tolkien", coverUrl: "/placeholder.svg?height=200&width=150" },
        { id: "8", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", coverUrl: "/placeholder.svg?height=200&width=150" },
      ];

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-8">Welcome Back!</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Your Uploaded Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {uploadedBooks.map((book, index) => (
                        <BookCard key={index} {...book} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Continue Reading</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lastReadBooks.map((book, index) => (
                        <BookCard key={index} {...book} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Trending Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingBooks.map((book, index) => (
                        <BookCard key={index} {...book} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Upload a New Book</h2>
                <div className="bg-secondary text-secondary-foreground p-8 rounded-lg shadow-md flex items-center justify-center">
                    <label htmlFor="upload-book" className="cursor-pointer flex flex-col items-center">
                        <Book size={48} className="mb-2" />
                        <span className="text-lg font-semibold">Click to Upload</span>
                        <input id="upload-book" type="file" className="hidden" accept=".epub,.pdf" />
                    </label>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;