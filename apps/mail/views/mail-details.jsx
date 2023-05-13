import { func } from 'prop-types';
import { mailService } from '../services/mail.service.js';
import { MailBoxFilter } from '../cmps/mail-box-filter.jsx';

const { useEffect, useState } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function MailDetails() {
  const [mail, setMail] = useState(null);
  const { mailId } = useParams();
  const [lastMailId, setLastMailId] = useState(null);
  const [nextMailId, setNextMailId] = useState(null);

  const navigate = useNavigate();

  function loadNextId() {
    mailService.getNextMailId(mailId).then(setNextMailId);
  }
  function loadLastId() {
    mailService.getLastMailId(mailId).then(setLastMailId);
  }

  function loadMail() {
    mailService
      .get(mailId)
      .then(setMail) // after loading the mail i can use it to update the IsRead to data
      .catch((err) => {
        console.log("Sorry couldn't find the requested mail", err);
        navigate('/mail');
      });
  }
  useEffect(() => {
    loadMail();
    loadNextId();
    loadLastId();
  }, [mailId]);
  if (!mail) return <h1>Loading Details...</h1>;
  function onBack() {
    navigate('/mail');
  }
  function onNext() {
    if (nextMailId) {
      navigate(`/mail/${nextMailId}`);
    }
  }
  function onEdit() {
    navigate(`/mail/compose/${mail.id}`);
  }

  function onLast() {
    if (lastMailId) {
      navigate(`/mail/${lastMailId}`);
    }
  }

  return (
    <div className="mail-details">
      <div className="mail-details-top">
        <h2>{mail.subject}</h2>
        <i className="fa-solid fa-arrow-left" onClick={() => onBack()}></i>
      </div>
      <div className="mail-details-top-container">
        <div>
          <p className="mail-details-from">From: {mail.from}</p>
          <p className="mail-details-to">To: {mail.to}</p>
        </div>
        <p>{new Date(mail.sentAt).toLocaleString()}</p>
      </div>
      <p>{mail.body}</p>
      <div className="mail-details-bottom">
        <i
          className="fa-solid fa-angle-left"
          onClick={() => {
            onLast();
          }}
        ></i>
        <i
          className="fa-solid fa-angle-right"
          onClick={() => {
            onNext();
          }}
        ></i>
        {mail.isDraft && (
          <button className="mail-details-edit" onClick={onEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
