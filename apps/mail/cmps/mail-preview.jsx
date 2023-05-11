import { mailService } from '../services/mail.service.js';

const { useState } = React;
const { Link } = ReactRouterDOM;
export function MailPreview({ mail, onHandleDelete, onHandleStar }) {
  const [hover, setHover] = useState(false);

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
        <i className="fa-solid fa-star golden-star" onClick={() => onHandleStar(mail)}></i>
      ) : (
        <i className="fa-regular fa-star" onClick={() => onHandleStar(mail)}></i>
      )}
      <Link to={`/mail/${mail.id}`}>
        {mail.from}
        {mail.subject}
        {mail.body}
      </Link>
      {hover && (
        // <button onClick={() => handleDelete(mail.id)}>
        <i className="fa-regular fa-trash-can" onClick={() => onHandleDelete(mail.id)}></i>
        // </button>
      )}
    </li>
  );
}
