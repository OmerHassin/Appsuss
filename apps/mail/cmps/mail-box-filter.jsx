import { mailService } from '../services/mail.service.js';

const { useState, useEffect } = React;

export function MailBoxFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [inboxCount, setInboxCount] = useState(0);

  useEffect(() => {
    onSetFilter(filterByToEdit);
    countInbox();
    // mailService.countInbox().then(setInboxCount);
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
  //   function handleChange({ target }) {
  //     const field = target.name;
  //     const value = target.type === 'number' ? +target.value || '' : target.value;

  //     setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }));
  //   }
  function handleClick(field, value) {
    setFilterByToEdit((prevFilterBy) => ({
      ...prevFilterBy,
      [field]: value,
    }));
  }

  const { isRead, isStared, isDraft, isSent } = filterByToEdit;

  return (
    <section className="box-filter">
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter())}>Inbox ({inboxCount})</button>
      <button onClick={() => handleClick('isStared', !isStared)}>Starred</button>
      <button onClick={() => handleClick('isRead', !isRead)}>Read</button>
      <button onClick={() => handleClick('isSent', !isSent)}>Sent</button>
      <button onClick={() => handleClick('isDraft', !isDraft)}>Drafts</button>
      <button>Trash</button>
    </section>
  );
}
