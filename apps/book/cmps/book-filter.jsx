import { bookService } from '../services/book.service.js';

const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    const value = target.type === 'number' ? +target.value || '' : target.value;

    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  const { title, price, sale } = filterByToEdit;
  return (
    <section className="book-filter">
      <h2>Filter Our Books</h2>

      <form onSubmit={onSubmitFilter}>
        <label htmlFor="name">Name:</label>
        <input value={title} onChange={handleChange} name="title" id="title" type="text" placeholder="By Name" />
        <label htmlFor="price">Price:</label>
        <input value={price} onChange={handleChange} type="number" name="price" id="price" placeholder="By Price" />
        <select for="sale" name="sale" onChange={handleChange}>
          <option value="all">All</option>
          <option value="available">For Sale</option>
          <option value="sold">Sold</option>
        </select>
        <button>Filter Books</button>
      </form>
    </section>
  );
}
