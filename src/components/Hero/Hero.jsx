import "./hero.css";

import { useEffect, useState } from "react";

const Hero = ({ title, subtitle, image }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLightboxOpen]);

  return (
    <>
      <section
        className={`hero ${image ? "hero_clickable" : ""}`}
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      >
        {image && (
          <button
            type="button"
            className="hero__image-trigger"
            aria-label={`View larger image of ${title}`}
            onClick={() => setIsLightboxOpen(true)}
          />
        )}

        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          <h2 className="hero__subtitle">{subtitle}</h2>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="hero__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged image of ${title}`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="hero__lightbox-container"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="hero__lightbox-close"
              aria-label="Close enlarged image"
              onClick={() => setIsLightboxOpen(false)}
            >
              &times;
            </button>

            <img src={image} alt={title} className="hero__lightbox-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
