import { mailService } from '../services/mail.service.js';

const { useState, useEffect } = React;

export function MailBoxFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [inboxCount, setInboxCount] = useState(0);
  const [activeButton, setActiveButton] = useState('inbox');

  useEffect(() => {
    onSetFilter(filterByToEdit);
    countInbox();
  }, [filterByToEdit]);

  function countInbox() {
    let count = 0;
    mailService.query().then((mails) => {
      mails.forEach((mail) => {
        if (mail.isRead === false) {
          count++;
        }
      });

      setInboxCount(count);
    });
  }

  return (
    <section className="box-filter">
      <button
        className={activeButton === 'inbox' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter());
          setActiveButton('inbox');
        }}
      >
        <i className="fa-solid fa-inbox"></i> Inbox ({inboxCount})
      </button>
      <button
        className={activeButton === 'starred' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isStared: true }));
          setActiveButton('starred');
        }}
      >
        <i className="fa-regular fa-star"></i> Starred
      </button>
      <button
        className={activeButton === 'read' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isRead: true }));
          setActiveButton('read');
        }}
      >
        <i className="fa-solid fa-book-open"></i>Read
      </button>
      <button
        className={activeButton === 'sent' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isSent: true }));
          setActiveButton('sent');
        }}
      >
        <i className="fa-regular fa-paper-plane"></i>Sent
      </button>
      <button
        className={activeButton === 'drafts' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isDraft: true }));
          setActiveButton('drafts');
        }}
      >
        <i className="fa-regular fa-note-sticky"></i>Drafts
      </button>
      <button
        className={activeButton === 'trash' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ removedAt: !false }));
          setActiveButton('trash');
        }}
      >
        <i className="fa-regular fa-trash-can filter-trash"></i> Trash
      </button>
    </section>
  );
}
