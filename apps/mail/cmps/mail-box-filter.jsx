import { mailService } from '../services/mail.service.js';
import { MailBoxModal } from './mail-box-modal.jsx';

const { useState, useEffect, useRef } = React;

export function MailBoxFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [inboxCount, setInboxCount] = useState(0);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    onSetFilter(filterByToEdit);
    countInbox();
  }, [filterByToEdit]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

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
      <button className="menu-button" onClick={() => setIsMenuOpen((prevState) => !prevState)}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div ref={menuRef}>
        <MailBoxModal setFilterByToEdit={setFilterByToEdit} inboxCount={inboxCount} isMenuOpen={isMenuOpen} />
      </div>
    </section>
  );
}
