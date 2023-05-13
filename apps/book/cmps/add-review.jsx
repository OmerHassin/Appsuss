import { bookService } from '../services/book.service.js';
import { ReviewComp } from './dynamic-comp.jsx';

const { useState } = React;

export function AddReview({ bookId }) {
  console.log(bookId);
  const [reviewObject, setReviewObject] = useState({ name: '', rating: 0, date: '' });
  function handleChange({ target }) {
    const field = target.name;
    const value = target.type === 'number' ? +target.value || '' : target.value;

    setReviewObject((prevReview) => ({ ...prevReview, [field]: value }));
  }
  console.log(reviewObject);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(bookId, reviewObject);
    bookService.addReview(bookId, reviewObject);
  }
  return (
    <form onSubmit={handleSubmit} className="make-review">
      <label>Full name:</label>
      <input onChange={handleChange} type="text" name="name" id="name" /> <br />
      <label>Rating:</label>
      <ReviewComp handleChange={handleChange} />
      <br />
      <label>readAt</label>
      <input onChange={handleChange} type="date" name="date" id="date" />
      <br />
      <button>Submit Review</button>
    </form>
  );
}
