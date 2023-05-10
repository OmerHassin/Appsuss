// const { useEffect, useState } = React;
// const { Link } = ReactRouterDOM;

// import { BookFilter } from '../cmps/book-filter.jsx';
// import { BookList } from '../cmps/book-list.jsx';
// import { showSuccessMsg } from '../services/event-bus.service.js';
// import { BookDetails } from './book-details.jsx';

// export function BookIndex() {
//   const [books, setBooks] = useState([]);
//   const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

//   useEffect(() => {
//     loadBooks();
//   }, [filterBy]);

//   function loadBooks() {
//     bookService.query(filterBy).then((books) => setBooks(books));
//   }

//   function onSetFilter(filterBy) {
//     setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
//   }

//   function onRemoveBook(bookId) {
//     aSyncStorageService.remove(bookId).then(() => {
//       const updatedBooks = books.filter((book) => book.id !== bookId);
//       setBooks(updatedBooks);
//       showSuccessMsg(`Book (${bookId}) removed!`);
//     });
//   }

//   return (
//     <section className="book-index">

//         <MailList mails={mails} onRemoveMail={onRemoveMail} />
//     </section>
//   );
// }
