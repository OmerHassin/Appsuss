export function RateByTextbox(props) {
  return (
    <div>
      <input
        type="number"
        placeholder="Enter a number between 1-5"
        name="rating"
        min={1}
        max={5}
        onChange={(ev) => {
          if (ev.target.value > 5 || ev.target.value < 0) return;
          props.setReviewValue(ev);
        }}
      />
    </div>
  );
}
