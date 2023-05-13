const { useState, useEffect } = React;

export function LongTxt({ txt, length = 100 }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      {showMore ? (
        <React.Fragment>
          {txt}
          <button onClick={() => setShowMore(false)}>Read less</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {txt.slice(0, length)}
          <button onClick={() => setShowMore(true)}>Read more</button>
        </React.Fragment>
      )}
    </div>
  );
}
