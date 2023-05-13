const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList } from '../cmps/book-list.jsx';
import { bookService } from '../services/book.service.js';
import { showSuccessMsg } from '../services/event-bus.service.js';
import { BookDetails } from './book-details.jsx';

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    bookService.query(filterBy).then((books) => setBooks(books));
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
      showSuccessMsg(`Book (${bookId}) removed!`);
    });
  }

  return (
    <section className="book-index">
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <Link to="/book/edit">Add Book</Link>
      <div className="books-list">
        <BookList books={books} onRemoveBook={onRemoveBook} />
      </div>
      {/* {!selectedCar && <React.Fragment>
                <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <CarList onSelectCar={onSelectCar} cars={cars} onRemoveCar={onRemoveCar} />
            </React.Fragment>}

            {selectedCar && <CarDetails onBack={()=>setSelectedCar(null)} car={selectedCar} />} */}
    </section>
  );
}
