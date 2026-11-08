import "./hero.css";

const Hero = ({ title, subtitle, image }) => {
  return (
    <section
      className="hero"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <h2 className="hero__subtitle">{subtitle}</h2>
      </div>
    </section>
  );
};

export default Hero;
