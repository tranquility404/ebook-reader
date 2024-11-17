import React from 'react';
import Layout from '../components/Layout';
import { Book, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    progress: number;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, coverUrl, progress }) => (
    <Link to={`/book/${id}`} className="block">
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg shadow-md">
            <img src={coverUrl} alt={`${title} cover`} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-muted-foreground mb-2">{author}</p>
            <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <div className="w-full bg-muted rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <span className="ml-2 text-sm">{progress}%</span>
            </div>
        </div>
    </Link>
);

const MyCollectionPage: React.FC = () => {
    const savedBooks = [
        { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverUrl: "/placeholder.svg?height=200&width=150", progress: 75 },
        { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", coverUrl: "/placeholder.svg?height=200&width=150", progress: 30 },
        { id: "3", title: "1984", author: "George Orwell", coverUrl: "/placeholder.svg?height=200&width=150", progress: 50 },
        { id: "4", title: "Pride and Prejudice", author: "Jane Austen", coverUrl: "/placeholder.svg?height=200&width=150", progress: 100 },
        { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", coverUrl: "/placeholder.svg?height=200&width=150", progress: 10 },
    ];

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-8">My Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBooks.map((book, index) => (
                    <BookCard key={index} {...book} />
                ))}
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Add New Books</h2>
                <div className="bg-secondary text-secondary-foreground p-8 rounded-lg shadow-md flex items-center justify-center">
                    <label htmlFor="upload-book" className="cursor-pointer flex flex-col items-center">
                        <Book size={48} className="mb-2" />
                        <span className="text-lg font-semibold">Click to Upload</span>
                        <input id="upload-book" type="file" className="hidden" accept=".epub,.pdf" />
                    </label>
                </div>
            </div>
        </Layout>
    );
};

export default MyCollectionPage;