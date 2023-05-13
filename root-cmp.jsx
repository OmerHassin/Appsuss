const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from './cmps/app-header.jsx';
import { About } from './views/about.jsx';
import { Home } from './views/home.jsx';
import { MailIndex } from './apps/mail/views/mail-index.jsx';
import { NoteIndex } from './apps/note/views/note-index.jsx';
import { MailDetails } from './apps/mail/views/mail-details.jsx';
import { MailCompose } from './apps/mail/cmps/mail-compose.jsx';
import { BookDetails } from './apps/book/views/book-details.jsx';
import { BookEdit } from './apps/book/views/book-edit.jsx';
import { BookIndex } from './apps/book/views/book-index.jsx';
import { BookAdd } from './apps/book/views/book-add.jsx';

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />} />
          <Route path="/mail/:mailId" element={<MailDetails />} />
          <Route path="/mail/compose/:mailId" element={<MailCompose />} />
          <Route path="/note" element={<NoteIndex />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/book/edit" element={<BookEdit />} />
          <Route path="/book/edit/:bookId" element={<BookEdit />} />
          <Route path="/book" element={<BookIndex />} />
          <Route path="/book/add" element={<BookAdd />} />
        </Routes>
      </section>
    </Router>
  );
}
