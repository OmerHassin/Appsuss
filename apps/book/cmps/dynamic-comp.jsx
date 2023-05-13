import { RateBySelect } from './ratebyselect.jsx';
import { RateByStars } from './ratebystars.jsx';
import { RateByTextbox } from './ratebytextbox.jsx';

const { useState, useEffect } = React;

export function ReviewComp({ handleChange }) {
  const [cmpType, setCmpType] = useState();
  const [reviewValue, setReviewValue] = useState();

  useEffect(() => {
    if (!reviewValue) return;
    handleChange(reviewValue);
  }, [reviewValue]);
  return (
    <section>
      <select
        onChange={(ev) => {
          setCmpType(ev.target.value);
        }}
      >
        <option>Stars</option>
        <option>Select</option>
        <option>Textbox</option>
      </select>
      <DynamicCmp cmpType={cmpType} setReviewValue={setReviewValue} />
    </section>
  );
}

function DynamicCmp(props) {
  switch (props.cmpType) {
    case 'Select':
      return <RateBySelect {...props} />;
    case 'Stars':
      return <RateByStars {...props} />;
    case 'Textbox':
      return <RateByTextbox {...props} />;
  }
}
