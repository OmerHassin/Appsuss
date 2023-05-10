export function MailList({ mails }) {
  return (
    <div>
      <ul>
        {mails.map((mail) => {
          return (
            <li key={mail.id}>
              {mail.from},{mail.subject}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
