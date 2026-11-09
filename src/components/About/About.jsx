import "./about.css";

import colombianLandscape from "../../images/about/about-colombia-MagdalenaRiver.jpg";

const About = () => {
  return (
    <main className="about">
      <section className="about__content">
        <div className="about__text-content">
          <h1 className="about__title">About Explore Colombia</h1>

          <p className="about__text">
            Explore Colombia is a guide to discovering the country beyond the
            headlines. Colombia is a country of remarkable natural and cultural
            diversity, where landscapes, history, traditions, and everyday life
            are closely connected.
          </p>

          <p className="about__text">
            Through selected destinations and the stories behind them, this
            project offers a closer look at Colombia: from its geography and
            biodiversity to its Indigenous heritage, architecture, food, and
            culture.
          </p>

          <p className="about__text">
            The aim is not to tell you everything about Colombia, but to help
            you understand and appreciate a little more of what makes each place
            unique.
          </p>
        </div>

        <img
          src={colombianLandscape}
          className="about__image"
          alt="Magdalena River in Colombian landscape"
        />
      </section>
    </main>
  );
};

export default About;
