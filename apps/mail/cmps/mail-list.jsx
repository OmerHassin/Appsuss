import { MailPreview } from './mail-preview.jsx';

export function MailList({ mails, onHandleDelete, onHandleStar }) {
  return (
    <ul className="mail-list">
      {mails.map((mail) => {
        return <MailPreview key={mail.id} mail={mail} onHandleDelete={onHandleDelete} onHandleStar={onHandleStar} />;
      })}
    </ul>
  );
}
