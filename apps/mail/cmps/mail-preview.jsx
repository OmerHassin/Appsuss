const { useState } = React;
export function MailPreview({ mail }) {
  const [hover, setHover] = useState(false);
  return (
    <li
      className={`mail-item ${mail.isRead ? 'mail-read' : ''} ${hover && 'list-item-hover'}`}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {mail.from}
      {mail.subject}
      {mail.body}
    </li>
  );
}
