const SubmitButton = ({ loading, name, className, onClick, icon }) => {
  return (
    <button
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      onClick={onClick}
      className={` ${className}`}
    >
      <span>
        {icon && icon} {name}{" "}
        <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
      </span>
    </button>
  );
};

export default SubmitButton;
