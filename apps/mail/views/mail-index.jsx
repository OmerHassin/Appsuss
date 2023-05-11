import { MailSearchFilter } from '../cmps/mail-search-filter.jsx';
import { MailList } from '../cmps/mail-list.jsx';
import { mailService } from '../services/mail.service.js';
import { MailBoxFilter } from '../cmps/mail-box-filter.jsx';
import { MailCompose } from '../cmps/mail-compose.jsx';

const { useEffect, useState } = React;
const { Link } = ReactRouterDOM;

export function MailIndex() {
  const [mails, setMails] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());

  useEffect(() => {
    loadMails();
  }, [filterBy]);
  function onHandleDelete(mailId) {
    mailService.deleteToTrash(mailId).then((mail) => {
      setMails((prevData) => [...prevData.filter((mail) => mail.id !== mailId)]);
      console.log(mail);
    });
  }
  function onHandleStar(mail) {
    const updatedMail = { ...mail, isStared: !mail.isStared };
    mailService.save(updatedMail).then((updated) => {
      setMails((prevMails) => prevMails.map((m) => (m.id === updated.id ? updated : m)));
      console.log(`Mail (${updated.id}) updated:`, updated);
    });
  }
  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails));
  }
  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
      showSuccessMsg(`Book (${bookId}) removed!`);
    });
  }

  function onSetFilter(filterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }

  return (
    <section className="mail-index">
      <button onClick={() => setShowCompose((prevState) => !prevState)}>Compose</button>
      <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <div className="list-filter-box-container">
        <MailBoxFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <MailList mails={mails} onHandleDelete={onHandleDelete} onHandleStar={onHandleStar} />
      </div>
      {showCompose && <MailCompose setShowCompose={setShowCompose} />}
    </section>
  );
}
