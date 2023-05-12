import { mailService } from '../services/mail.service.js';

const { useState } = React;
export function MailCompose({ setShowCompose }) {
  const [formData, setFormData] = useState({
    from: 'user@appsus.com',
    to: '',
    subject: '',
    body: '',
    isSent: true,
    isRead: true,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  function handleCancel(event) {
    event.preventDefault();
    setShowCompose(false);
  }
  function handleSubmit(event) {
    event.preventDefault();

    // setShowCompose(false);
    mailService.save(formData).then(setShowCompose(false));
  }

  return (
    <form className="compose-container" onSubmit={handleSubmit}>
      <div>
        <div className="compose-header">
          <label>New Message</label>
          <button onClick={handleCancel}>X</button>
        </div>

        <div className="compose-to-subject-div">
          <input className="compose-item" type="text" id="to" name="to" value={formData.to} onChange={handleChange} placeholder="To" />

          <input
            type="text"
            className="compose-item"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
        </div>
      </div>
      <div className="compose-text">
        <p className="compose-text-area">
          <textarea id="body" name="body" value={formData.body} onChange={handleChange} />
        </p>
      </div>
      <button type="submit" className="compose-submit">
        Send
      </button>
    </form>
  );
}
