import { MailPreview } from './mail-preview.jsx';

export function MailList({ mails, onHandleDelete, onHandleStar }) {
  console.log(onHandleDelete);
  return (
    <div>
      <ul>
        {mails.map((mail) => {
          return <MailPreview key={mail.id} mail={mail} onHandleDelete={onHandleDelete} onHandleStar={onHandleStar} />;
        })}
      </ul>
    </div>
  );
}
