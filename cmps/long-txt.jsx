const { useState } = React;

export function LongTxt({ txt, length = 100 }) {
	const [showMore, setShowMore] = useState(false)
	const trimmedTxt = `${txt.substring(0, length)} ...`
  
	function toggleShowMore() {
		setShowMore(prevShowMore => !prevShowMore)
	}

	return (
	  <section>
		<p>{showMore ? txt : trimmedTxt}</p>
		{txt.length > length && (
		  <button onClick={toggleShowMore}>{showMore ? 'Read less' : 'Read more'}</button>
		)}
	  </section>
	)
  }