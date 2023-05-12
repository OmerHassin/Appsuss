export function NoteVideo({note}) {
    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"

  return (
    <section className="note-video">
        <h2>{note.info.title}</h2>
        <div className="video-container">
        <iframe width="100%" src="https://www.youtube.com/embed/KU6IOaBwc04" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
  );
}