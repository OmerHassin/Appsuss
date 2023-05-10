import { MailPreview } from './mail-preview.jsx';

const { Link } = ReactRouterDOM;

export function MailList({ mails }) {
  return (
    <div>
      <ul>
        {mails.map((mail) => {
          return (
            <Link to={`/mail/${mail.id}`}>
              <MailPreview mail={mail} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
