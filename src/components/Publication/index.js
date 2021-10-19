import { connect } from "react-redux";
import { useState, useRef } from "react";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import { BiRightArrow, BiDownArrow } from "react-icons/bi";

const PublicationComponent = (props) => {
  const {
    id,
    title,
    body,
    loadingComments,
    errorLoadingComments,
    comments,
    userId,
  } = props;
  const { handleLoadComments } = props;
  const [openComments, setOpenComments] = useState(false);
  const commentsContainer = useRef(null);

  const renderComments = (loadingComments) => {
    if (loadingComments) return null;
    return comments?.publicationComments.map(({ email, body, id }) => (
      <li key={id}>
        <b>
          <u>{email}</u>
        </b>
        <br />
        {body}
      </li>
    ));
  };

  return (
    <div className="publication">
      <h2>{title}</h2>
      <p>{body}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <button
          style={{ display: openComments ? "block" : "none" }}
          type="button"
          onClick={() => {
            if (!openComments) {
              return;
            } else {
              handleLoadComments(id, userId, true);
            }
          }}
        >
          Actualizar comentarios
        </button>
        <span
          onClick={() => {
            setOpenComments(!openComments);
            handleLoadComments(id, userId, false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {openComments ? <BiDownArrow /> : <BiRightArrow />}
        </span>
      </div>
      <ul
        ref={commentsContainer}
        className={`commentsContainer ${
          openComments ? "expandedComments" : "contractedComments"
        }`}
      >
        {loadingComments && <Spinner />}
        {errorLoadingComments && <Fatal message={errorLoadingComments} />}
        {renderComments(loadingComments)}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ commentReducer }, props) => {
  return {
    comments: commentReducer.comments.find(
      (e) => e.publicationId.toString() === props.id.toString()
    ),
  };
};

const mapDispatchToProps = null;

export const Publication = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationComponent);
