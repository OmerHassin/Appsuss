import { mailService } from '../services/mail.service.js';
import { MailBoxModal } from './mail-box-modal.jsx';

const { useState, useEffect } = React;

export function MailBoxFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [inboxCount, setInboxCount] = useState(0);

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const showMenuButton = window.innerWidth <= 360;

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
    <section>
      <button className="menu-button" onClick={() => setIsMenuOpen(true)}>
        Menu
      </button>
      <MailBoxModal setFilterByToEdit={setFilterByToEdit} inboxCount={inboxCount} />
    </section>
  );
}
