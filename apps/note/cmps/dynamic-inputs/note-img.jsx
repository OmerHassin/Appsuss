const { useState, useEffect, useRef } = React

export function NoteImg({ note }) {
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  }

  return (
    <section className="note-img">
      {note.info.txt && <p>{note.info.txt}</p>}
      {selectedImage ? (
        <img src={selectedImage} alt="Note Image" />
      ) : (
        <img src={note.info.imgUrl} alt="Note Image" />
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <p>{note.type}</p>
    </section>
  );
}