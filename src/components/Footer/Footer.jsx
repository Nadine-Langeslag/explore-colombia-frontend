import "./footer.css";
import footerIllustration from "../../images/footer/colombia-footer-illustration.png";

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer__illustration" src={footerIllustration} alt="" />

      <section className="footer__message">
        <h2 className="footer__title">Travel responsibly</h2>
        <p className="footer__text">
          Help preserve the natural beauty and cultural heritage of Colombia for
          future generations.
        </p>
      </section>

      <p className="footer__copyright">&copy; 2026 Explore Colombia</p>
    </footer>
  );
};

export default Footer;
