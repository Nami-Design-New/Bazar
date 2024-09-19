import { Form } from "react-bootstrap";

const PhoneField = ({ label, span, ...props }) => {
  return (
    <div className="input-field w-100">
      <label htmlFor={props.id}>
        <div className="d-flex justify-content-between align-items-center">
          {label}
        </div>
      </label>
      <Form.Control className="form-control" {...props} maxLength={9} />
      {span && <span className="input-span">{span}</span>}
    </div>
  );
};

export default PhoneField;
