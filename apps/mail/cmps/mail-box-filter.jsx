import { mailService } from '../services/mail.service.js';

const { useState, useEffect } = React;

export function MailBoxFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [inboxCount, setInboxCount] = useState(0);
  // test
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

  // function handleClick(input = '') {
  //   setFilterByToEdit(() => {
  //     mailService.getDefaultFilter(input);
  //   });
  // }

  return (
    <section className="box-filter">
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter())}>Inbox ({inboxCount})</button>
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter({ isStared: true }))}>Starred</button>
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter({ isRead: true }))}>Read</button>
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter({ isSent: true }))}>Sent</button>
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter({ isDraft: true }))}>Drafts</button>
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter({ removedAt: !false }))}>Trash</button>
    </section>
  );
}
