import { mailService } from '../services/mail.service.js';

const { useState } = React;
const { Link } = ReactRouterDOM;
export function MailPreview({ mail }) {
  const [hover, setHover] = useState(false);
  function handleDelete(mailId) {
    mailService.deleteToTrash(mailId);
  }
  function handleStar(mail) {
    const updatedMail = { ...mail, isStared: !mail.isStared };
    mailService.save(updatedMail);
  }
  return (
    <li
      className={`mail-item ${mail.isRead ? 'mail-read' : ''} ${hover ? 'list-item-hover' : ''}`}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {mail.isStared ? (
        <i class="fa-solid fa-star golden-star" onClick={() => handleStar(mail)}></i>
      ) : (
        <i class="fa-regular fa-star" onClick={() => handleStar(mail)}></i>
      )}
      <Link to={`/mail/${mail.id}`}>
        {mail.from}
        {mail.subject}
        {mail.body}
      </Link>
      {hover && (
        // <button onClick={() => handleDelete(mail.id)}>
        <i className="fa-regular fa-trash-can" onClick={() => handleDelete(mail.id)}></i>
        // </button>
      )}
    </li>
  );
}
