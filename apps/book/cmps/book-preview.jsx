import { BookDetails } from '../views/book-details.jsx';
import { LongTxt } from './long-txt.jsx';

export function BookPreview({ book }) {
  // console.log(book);
  let priceColor = 'normal-price';
  let pageString = 'Normal Reading';
  let dateString = '';

  if (book.pageCount > 500) pageString = 'Serious Reading';
  else if (book.pageCount > 200) pageString = 'Descent Reading';
  else if (book.pageCount < 100) pageString = 'Light Reading';
  if (book.publishedDate < 2013) dateString = 'Vintage';
  else if (book.publishedDate > 2021) dateString = 'New!';
  if (book.listPrice) {
    if (book.listPrice.amount > 150) priceColor = 'red-price';
    else if (book.listPrice.amount < 20) priceColor = 'green-price';
  }

  return (
    <article className="book-article">
      <h1>Book Title: {book.title ? book.title : null}</h1>
      {/* {book.listPrice.isOnSale ? 'works' : null} */}
      {book.listPrice.isOnSale ? <h3 className="on-sale-sign"> ON SALE!</h3> : ''}
      <img src={`${book.thumbnail}`} className="book-img" />
      <p>
        Published Date: {book.publishedDate} , {dateString}
      </p>
      <p>Description: {book.description}</p>
      <h4>
        Page Count: {book.pageCount}, {pageString}
      </h4>
      <div className="price-container"></div>

      <LongTxt
        txt={
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia perferendis, assumenda praesentium voluptatibus nesciunt aliquid ex harum ut quis saepe, dicta eveniet corporis temporibus vero, rerum sapiente aperiam in?'
        }
      />
    </article>
  );
}
