import { MailList } from '../cmps/mail-list.jsx';
import { mailService } from '../services/mail.service.js';

const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

// import { BookFilter } from '../cmps/book-filter.jsx';
// import { BookList } from '../cmps/book-list.jsx';

// import { BookDetails } from './book-details.jsx';

export function MailIndex() {
  const [mails, setMails] = useState([]);
  //   const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());

  useEffect(() => {
    loadMails();
  }, []);

  function loadMails() {
    mailService.query().then((mails) => setMails(mails));
  }
  console.log(mails);

  //   function onSetFilter(filterBy) {
  //     setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  //   }

  //   function onRemoveBook(bookId) {
  //     aSyncStorageService.remove(bookId).then(() => {
  //       const updatedBooks = mails.filter((book) => book.id !== bookId);
  //       setMails(updatedBooks);
  //       showSuccessMsg(`Book (${bookId}) removed!`);
  //     });

  return (
    <section className="mail-index">
      <MailList mails={mails} />
    </section>
  );
  //   onRemoveMail={onRemoveMail}
}
