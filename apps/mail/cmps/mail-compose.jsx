import { mailService } from '../services/mail.service.js';

const { useState } = React;
export function MailCompose({ setShowCompose }) {
  const now = new Date();
  const timestamp = now.getTime();
  const [formData, setFormData] = useState({
    from: 'user@appsus.com',
    to: '',
    subject: '',
    body: '',
    sentAt: timestamp,
    isSent: true,
    isRead: true,
    isDraft: false,
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
    const updatedFormData = {
      ...formData,
      isDraft: true,
      isSent: false,
    };
    setFormData(updatedFormData);
    console.log('Updated form data:', updatedFormData);
    mailService.save(updatedFormData).then(() => setShowCompose(false));
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
          <button onClick={handleCancel} className="x-button">
            X
          </button>
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
