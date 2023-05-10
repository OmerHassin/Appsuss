import { mailService } from '../services/mail.service.js';

const { useState, useEffect } = React;

export function MailBoxFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

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

  const { isRead, isStared, isDraft } = filterByToEdit;

  return (
    <section className="box-filter">
      <button onClick={() => setFilterByToEdit(mailService.getDefaultFilter())}>Inbox</button>
      <button onClick={() => handleClick('isStared', !isStared)}>Starred</button>
      <button onClick={() => handleClick('isRead', !isRead)}>Read</button>
      <button>Sent</button>
      <button onClick={() => handleClick('isDraft', !isDraft)}>Drafts</button>
      <button>Trash</button>
    </section>
  );
}
