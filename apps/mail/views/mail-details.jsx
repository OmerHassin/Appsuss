import { func } from 'prop-types';
import { mailService } from '../services/mail.service.js';

const { useEffect, useState } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function MailDetails() {
  const [mail, setMail] = useState(null);
  const { mailId } = useParams();
  const [lastMailId, setLastMailId] = useState(null);
  const [nextMailId, setNextMailId] = useState(null);

  const navigate = useNavigate();
  console.log(mail, 'here!');

  function loadNextId() {
    mailService.getNextMailId(mailId).then(setNextMailId);
  }
  function loadLastId() {
    mailService.getLastMailId(mailId).then(setLastMailId);
  }

  function loadMails() {
    mailService
      .get(mailId)
      .then(setMail)
      .catch((err) => {
        console.log("Sorry couldn't find the requested mail", err);
        navigate('/mail');
      });
  }
  useEffect(() => {
    loadMails();
    loadNextId();
    loadLastId();
  }, [mailId]);
  if (!mail) return <h1>Loading Details...</h1>;
  function onBack() {
    navigate('/mail');
  }
  return (
    <div>
      <h2>{mail.subject}</h2>
      <div className="mail-details-top">
        <p>From: {mail.from}</p>
        <p>To: {mail.to}</p>
        <p>{new Date(mail.sentAt).toLocaleString()}</p>
      </div>
      <p>{mail.body}</p>
    </div>
  );
}
