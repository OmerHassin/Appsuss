const { Link } = ReactRouterDOM;

import { BookPreview } from './book-preview.jsx';

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-preview">
          <BookPreview book={book} />
          <section className="book-buttons">
            <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
            <div className="book-links-container">
              <Link to={`/book/${book.id}`}>More Details</Link>
              <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </div>
          </section>
        </li>
      ))}
    </ul>
  );
}
