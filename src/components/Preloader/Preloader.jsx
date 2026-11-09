import "./preloader.css";

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__spinner"></div>
      <p className="preloader__text">Loading...</p>
    </div>
  );
};

export default Preloader;
