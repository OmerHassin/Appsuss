import { AddReview } from '../cmps/add-review.jsx';
import { bookService } from '../services/book.service.js';
import { ReviewComp } from '../cmps/dynamic-comp.jsx';

const { useEffect, useState } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
  const [book, setBook] = useState(null);
  const params = useParams();
  const [lastBookId, setLastBookId] = useState(null);
  const [nextBookId, setNextBookId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadBooks();
    loadNextId();
    loadLastId();
  }, [params.bookId]);

  function loadNextId() {
    bookService.getNextBookId(params.bookId).then(setNextBookId);
  }
  function loadLastId() {
    bookService.getLastBookId(params.bookId).then(setLastBookId);
  }

  function loadBooks() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log("Sorry couldn't find the requested car", err);
        navigate('/book');
      });
  }

  if (!book) return <h1>Loading Book Details...</h1>;
  function onBack() {
    navigate('/book');
  }
  console.log();
  return (
    <section className="book-details">
      <div className="book-top-container">
        <h1>Book Title: {book.title} </h1>

        <i onClick={onBack} className="fa-solid fa-arrow-left back-arrow"></i>
      </div>
      {book.listPrice.isOnSale ? <h3 className="on-sale-sign"> ON SALE!</h3> : ''}
      <div className="image-review-container">
        <img src={`${book.thumbnail}`} />

        <AddReview bookId={book.id} />
      </div>
      <div className="reviews-container">
        {book.reviews &&
          book.reviews.map((review) => (
            <div className="review">
              <p>Reviewer Name: {review.name}</p>
              <p>Reviewer Rating: {review.rating}</p>
              <p>Reviewer Date: {review.date}</p>
            </div>
          ))}
      </div>
      <p>Published Date: {book.publishedDate}</p>
      <p>Description: {book.description}</p>
      <h4>Page Count: {book.pageCount}</h4>

      <div className="last-next-buttons">
        <Link to={`/book/${lastBookId}`}>Previous Book </Link>
        <Link to={`/book/${nextBookId}`}> Next Book</Link>
      </div>
    </section>
  );
}
