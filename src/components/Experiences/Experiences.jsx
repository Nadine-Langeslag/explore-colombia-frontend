import "./experiences.css";

import { useEffect, useState } from "react";
import {
  getExperiences,
  createExperience,
  editExperience,
  deleteExperience,
} from "../../utils/api.js";
import { useAuth } from "../../contexts/useAuth.js";
import Preloader from "../Preloader/Preloader.jsx";

const Experiences = ({ itemId, itemType }) => {
  const { currentUser, isAuthenticated } = useAuth();

  const [experiences, setExperiences] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editError, setEditError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedExperience = newExperience.trim();

    if (trimmedExperience.length < 10 || trimmedExperience.length > 300) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const experience = await createExperience(
        itemId,
        itemType,
        trimmedExperience
      );

      setExperiences((currentExperiences) => [
        experience,
        ...currentExperiences,
      ]);

      setNewExperience("");
    } catch (error) {
      console.error(error);
      setSubmitError(
        error.message || "Unable to share your experience. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (event, experienceId) => {
    event.preventDefault();

    const trimmedText = editedText.trim();

    if (trimmedText.length < 10 || trimmedText.length > 300) {
      return;
    }

    setEditError("");

    try {
      const updatedExperience = await editExperience(experienceId, trimmedText);

      setExperiences((currentExperiences) =>
        currentExperiences.map((experience) =>
          experience._id === experienceId
            ? {
                ...experience,
                ...updatedExperience,
                author: experience.author,
              }
            : experience
        )
      );

      setEditingId(null);
      setEditedText("");
    } catch (error) {
      console.error(error);
      setEditError(error.message || "Unable to update experience.");
    }
  };

  const handleDelete = async (experienceId) => {
    setDeletingId(experienceId);
    setDeleteError("");

    try {
      await deleteExperience(experienceId);

      setExperiences((currentExperiences) =>
        currentExperiences.filter(
          (experience) => experience._id !== experienceId
        )
      );
    } catch (error) {
      console.error(error);
      setDeleteError(error.message || "Unable to delete experience.");
    } finally {
      setDeletingId(null);
    }
  };

  const hasSharedExperience = experiences.some(
    (experience) =>
      String(experience.author?._id || experience.author) ===
      String(currentUser._id)
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchExperiences = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getExperiences(itemId, itemType);
        setExperiences(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load experiences. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, [itemId, itemType, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section className="experiences">
      <h2 className="experiences__title">Shared Experiences</h2>

      {deleteError && (
        <p className="experiences__error" role="alert">
          {deleteError}
        </p>
      )}

      {!hasSharedExperience && (
        <form className="experiences__form" onSubmit={handleSubmit}>
          <label htmlFor="experience-text">Share your experience</label>

          <textarea
            id="experience-text"
            className="experiences__textarea"
            value={newExperience}
            onChange={(event) => setNewExperience(event.target.value)}
            placeholder="Tell us about your experience..."
            minLength={10}
            maxLength={300}
            required
          />

          <div className="experiences__form-footer">
            <span className="experiences__char-count">
              {newExperience.length}/300
            </span>

            <button
              type="submit"
              className="experiences__submit"
              disabled={
                isSubmitting ||
                newExperience.trim().length < 10 ||
                newExperience.trim().length > 300
              }
            >
              {isSubmitting ? "Sharing..." : "Share experience"}
            </button>
          </div>

          {submitError && (
            <p className="experiences__error" role="alert">
              {submitError}
            </p>
          )}
        </form>
      )}

      {error && (
        <p className="experiences__error" role="alert">
          {error}
        </p>
      )}

      {!error && experiences.length === 0 && (
        <p className="experiences__empty">
          No experiences shared yet. Be the first!
        </p>
      )}

      {!error && experiences.length > 0 && (
        <>
          <div className="experiences__list">
            {experiences.slice(0, visibleCount).map((experience) => {
              const isAuthor =
                String(experience.author?._id || experience.author) ===
                String(currentUser._id);

              const isEditing = editingId === experience._id;

              return (
                <article className="experience" key={experience._id}>
                  {isEditing ? (
                    <form
                      className="experience__edit-form"
                      onSubmit={(event) =>
                        handleEditSubmit(event, experience._id)
                      }
                    >
                      <textarea
                        className="experience__edit-textarea"
                        value={editedText}
                        onChange={(event) => setEditedText(event.target.value)}
                        minLength={10}
                        maxLength={300}
                        required
                      />

                      <span className="experiences__char-count">
                        {editedText.length}/300
                      </span>

                      <div className="experience__edit-actions">
                        <button
                          type="submit"
                          className="experience__save-button"
                          disabled={
                            editedText.trim().length < 10 ||
                            editedText.trim().length > 300
                          }
                        >
                          Save changes
                        </button>

                        <button
                          type="button"
                          className="experience__cancel-button"
                          onClick={() => {
                            setEditingId(null);
                            setEditedText("");
                            setEditError("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>

                      {editError && (
                        <p className="experiences__error" role="alert">
                          {editError}
                        </p>
                      )}
                    </form>
                  ) : (
                    <p className="experience__text">{experience.text}</p>
                  )}

                  <p className="experience__author">
                    Shared by {experience.author?.name || "Unknown user"}
                  </p>

                  <time className="experience__date">
                    {new Date(experience.createdAt).toLocaleDateString()}
                  </time>

                  {isAuthor && !isEditing && (
                    <div className="experience__actions">
                      <button
                        type="button"
                        className="experience__edit-button"
                        disabled={editingId !== null || deletingId !== null}
                        onClick={() => {
                          setEditingId(experience._id);
                          setEditedText(experience.text);
                          setEditError("");
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="experience__delete-button"
                        disabled={deletingId !== null || editingId !== null}
                        onClick={() => handleDelete(experience._id)}
                      >
                        {deletingId === experience._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {visibleCount < experiences.length && (
            <button
              type="button"
              className="experiences__show-more"
              onClick={() => setVisibleCount((count) => count + 3)}
            >
              Show more
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default Experiences;
