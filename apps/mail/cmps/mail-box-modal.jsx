const { useState } = React;
export function MailBoxModal({ setFilterByToEdit, inboxCount }) {
  const [activeButton, setActiveButton] = useState('inbox');

  return (
    <div className="box-filter">
      <button
        className={activeButton === 'inbox' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter());
          setActiveButton('inbox');
        }}
      >
        <div>
          <i className="fa-solid fa-inbox"></i>Inbox
        </div>
        <span className="count">{inboxCount}</span>
      </button>
      <button
        className={activeButton === 'starred' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isStared: true }));
          setActiveButton('starred');
        }}
      >
        <div>
          <i className="fa-regular fa-star box-star"></i>Starred
        </div>
      </button>
      <button
        className={activeButton === 'read' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isRead: true }));
          setActiveButton('read');
        }}
      >
        <div>
          <i className="fa-solid fa-book-open"></i>Read
        </div>
      </button>
      <button
        className={activeButton === 'sent' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isSent: true }));
          setActiveButton('sent');
        }}
      >
        <div>
          <i className="fa-regular fa-paper-plane"></i>Sent
        </div>
      </button>
      <button
        className={activeButton === 'drafts' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ isDraft: true }));
          setActiveButton('drafts');
        }}
      >
        <div>
          <i className="fa-regular fa-note-sticky"></i>Drafts
        </div>
      </button>
      <button
        className={activeButton === 'trash' ? 'active-btn' : ''}
        onClick={() => {
          setFilterByToEdit(mailService.getDefaultFilter({ removedAt: !false }));
          setActiveButton('trash');
        }}
      >
        <div>
          <i className="fa-regular fa-trash-can filter-trash"></i>Trash
        </div>
      </button>
    </div>
  );
}
