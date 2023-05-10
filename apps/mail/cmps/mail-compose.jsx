import { mailService } from '../services/mail.service.js';

const { useState } = React;
export function MailCompose({ setShowCompose }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    subject: '',
    body: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    formData.isDraft = true;
    setShowCompose(false);
    mailService.save(formData).then(setShowCompose(false));
  }

  return (
    <form className="compose-container" onSubmit={handleSubmit}>
      <p className="form-item">
        <label htmlFor="from">From</label>
        <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} placeholder="Your-Mail" />
      </p>
      <p className="form-item">
        <label htmlFor="to">To</label>
        <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} />
      </p>
      <p className="form-item">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} />
      </p>
      <p className="form-text-area">
        <textarea id="body" name="body" value={formData.body} onChange={handleChange} />
      </p>
      <button type="submit">Send</button>
    </form>
  );
}
