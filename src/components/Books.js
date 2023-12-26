import React, { useState, useEffect } from 'react';

const List = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiURL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/SERz0T6MOlfncfi0umcc/books';

    const fetchBooks = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log('API response:', data);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Something went wrong, cannot fetch data');
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {Array.isArray(books) && books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default List;
