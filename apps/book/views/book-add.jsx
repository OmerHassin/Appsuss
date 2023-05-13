import { bookService } from '../services/book.service.js';
import { utilService } from '../services/util.service.js';

const { useState, useEffect } = React;

export function BookAdd() {
  const [searchInput, setSearchInput] = useState(null);
  const [dataSearch, setDataSearch] = useState(null);
  const [googleBooks, setGoogleBooks] = useState([]);
  // Adds a compouting with routing that has a search box when the user types in it it calls the
  //   google books api which match the search term,
  //   use debounce recommended, use Ul to disply
  //   resuslts with each result has + to add the book to our data base
  //   convert the book u get to match our database structure to not have problems when importing
  //

  useEffect(() => {
    bookService.googleQuery(dataSearch).then((data) => {
      setGoogleBooks(data);
    });

    if (!dataSearch) return;
  }, [dataSearch]);
  console.log(searchInput);
  function handleChange({ target }) {
    const field = target.name;
    const value = target.type === 'number' ? +target.value || '' : target.value;
    setSearchInput((prevSearch) => ({ ...prevSearch, [field]: value }));
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    setDataSearch(searchInput.input);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={handleChange} name="input" id="input" />
        <button>Submit</button>
      </form>
      <ul>
        {googleBooks
          ? googleBooks.map((book) => {
              return (
                <li>
                  {book.title} <button onClick={() => bookService.addGoogleBook(book)}>+</button>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
