import fav from "../assets/images/logo.png";
const Loader = () => {
  return (
    <div className="loader">
      <img src={fav} alt="fav" />
      <span></span>
    </div>
  );
};

export default Loader;
