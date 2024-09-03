const SubmitButton = ({ loading, name, className, onClick, icon }) => {
  return (
    <button
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      onClick={onClick}
      className={`custom-btn ${className} filled`}
    >
      {icon && icon} {name}{" "}
      <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
    </button>
  );
};

export default SubmitButton;
