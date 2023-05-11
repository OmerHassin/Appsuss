import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';
// import { storageService } from './storage.service.js';
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

const EMAIL_KEY = 'emailDB';
_createEmails();

export const mailService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getNextMailId,
  getLastMailId,
  deleteToTrash,
};

function query(filterBy = {}) {
  return storageService.query(EMAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const filterText = filterBy.txt.toLowerCase();
      mails = mails.filter(
        (mail) =>
          mail.subject.toLowerCase().includes(filterText) ||
          mail.body.toLowerCase().includes(filterText) ||
          mail.from.toLowerCase().includes(filterText)
      );
    }
    if (filterBy.isRead) {
      mails = mails.filter((mail) => mail.isRead);
    }
    if (filterBy.isSent) {
      mails = mails.filter((mail) => mail.isSent);
    }
    if (filterBy.isStared) {
      mails = mails.filter((mail) => mail.isStared);
    }
    if (filterBy.isDraft) {
      mails = mails.filter((mail) => mail.isDraft);
    }
    if (!filterBy.removedAt) {
      mails = mails.filter((mail) => !mail.removedAt);
    }
    if (filterBy.removedAt) {
      mails = mails.filter((mail) => mail.removedAt);
    }
    return mails;
  });
}

function get(mailId) {
  return storageService.get(EMAIL_KEY, mailId);
  // return axios.get(CAR_KEY, carId)
}

function remove(mailId) {
  return storageService.remove(EMAIL_KEY, mailId);
}
function deleteToTrash(mailId) {
  return storageService.query(EMAIL_KEY).then((mails) => {
    const toTrashMail = mails.find((mail) => mail.id === mailId);
    if (!toTrashMail.removedAt) {
      toTrashMail.removedAt = new Date();
      return storageService.put(EMAIL_KEY, toTrashMail);
    }
    remove(mailId);
  });
}
function save(mail) {
  return storageService
    .query(EMAIL_KEY)
    .then((mails) => {
      const existingMail = mails.find((item) => item.id === mail.id);
      if (existingMail) {
        return storageService.put(EMAIL_KEY, mail);
      } else {
        return storageService.post(EMAIL_KEY, mail);
      }
    })
    .catch((error) => {
      console.error('Error while saving email:', error);
    });
}

function getDefaultFilter(change) {
  const defaultFilter = { status: '', txt: '', isRead: '', isStared: '', lables: [], isDraft: false, removedAt: false, isSent: false };
  return { ...defaultFilter, ...change };
}

function getNextMailId(bookId) {
  return storageService.query(EMAIL_KEY).then((books) => {
    let bookIdx = books.findIndex((book) => book.id === bookId);
    if (bookIdx === books.length - 1) bookIdx = -1;
    return books[bookIdx + 1].id;
  });
}

function getLastMailId(bookId) {
  return storageService.query(EMAIL_KEY).then((books) => {
    let bookIdx = books.findIndex((book) => book.id === bookId);
    if (bookIdx === 0) bookIdx = books.length;
    return books[bookIdx - 1].id;
  });
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAIL_KEY);

  if (!emails || !emails.length) {
    emails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e102',
        subject: 'Reminder: Meeting Tomorrow',
        body: 'Just a friendly reminder that we have a meeting scheduled for tomorrow at 10am. Please come prepared with any necessary materials.',
        isRead: true,
        sentAt: 1620662400000,
        removedAt: null,
        from: 'manager@company.com',
        to: 'user@appsus.com',
      },
      {
        id: 'e103',
        subject: 'Thanks for your order!',
        body: 'Dear customer, thank you for your recent order. Your items are being prepared for shipment and should arrive within the next few days. If you have any questions or concerns, please do not hesitate to contact us.',
        isRead: false,
        sentAt: 1643011200000,
        removedAt: null,
        from: 'sales@shop.com',
        to: 'user@appsus.com',
      },
    ];

    utilService.saveToStorage(EMAIL_KEY, emails);
  }
}
