import { MailPreview } from './mail-preview.jsx';

export function MailList({ mails }) {
  return (
    <div>
      <ul>
        {mails.map((mail) => {
          return <MailPreview mail={mail} />;
        })}
      </ul>
    </div>
  );
}
