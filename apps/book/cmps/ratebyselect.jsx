import { func } from 'prop-types';

export function RateBySelect(props) {
  return (
    <select
      name="rating"
      onChange={(ev) => {
        props.setReviewValue(ev);
      }}
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  );
}
