const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;
import { bookService } from '../services/book.service.js';

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
  const {
    title,
    listPrice: { amount: price },
  } = bookToEdit;

  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    if (params.bookId) {
      loadBook();
    }
  }, []);
  function handleChange({ target }) {
    const field = target.name;
    const value = target.type === 'number' ? +target.value || '' : target.value;

    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }));
  }
  function loadBook() {
    bookService.get(params.bookId).then(setBookToEdit);
  }
  function saveBook(ev) {
    ev.preventDefault();
    bookService.save(bookToEdit).then(() => {
      navigate('/book');
    });
  }

  return (
    <div>
      <form onSubmit={saveBook}>
        <label htmlFor="title">Book Name?</label>
        <input onChange={handleChange} type="text" name="title" id="title" value={title} />
        <label htmlFor="price">Price?</label>
        <input onChange={handleChange} type="number" name="listPrice" id="price" value={price} />

        <button>{bookToEdit.id ? 'Edit Book' : 'Add Book'}</button>
      </form>
    </div>
  );
}
