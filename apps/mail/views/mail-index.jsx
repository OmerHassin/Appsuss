import { MailSearchFilter } from '../cmps/mail-search-filter.jsx';
import { MailList } from '../cmps/mail-list.jsx';
import { mailService } from '../services/mail.service.js';
import { MailBoxFilter } from '../cmps/mail-box-filter.jsx';
import { MailCompose } from '../cmps/mail-compose.jsx';

const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

// import { BookFilter } from '../cmps/book-filter.jsx';
// import { BookList } from '../cmps/book-list.jsx';

// import { BookDetails } from './book-details.jsx';

export function MailIndex() {
  const [mails, setMails] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());

  useEffect(() => {
    loadMails();
  }, [filterBy]);

  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails));
  }
  console.log(mails);

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }

  //   function onRemoveBook(bookId) {
  //     aSyncStorageService.remove(bookId).then(() => {
  //       const updatedBooks = mails.filter((book) => book.id !== bookId);
  //       setMails(updatedBooks);
  //       showSuccessMsg(`Book (${bookId}) removed!`);
  //     });

  return (
    <section className="mail-index">
      <button onClick={() => setShowCompose((prevState) => !prevState)}>Compose</button>
      <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <div className="list-filter-box-container">
        <MailBoxFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <MailList mails={mails} />
      </div>
      {showCompose && <MailCompose setShowCompose={setShowCompose} />}
    </section>
  );
  //   onRemoveMail={onRemoveMail}
}
