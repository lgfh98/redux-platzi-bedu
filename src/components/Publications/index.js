import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import * as userActions from "../../actions/userActions";
import * as PublicationActions from "../../actions/PublicationActions";

const { getAll: getAllUsers } = userActions;
const { getByUser: getPublicationsByUser } = PublicationActions;

const PublicationsComponent = (props) => {
  const { userReducer, publicationReducer } = props;
  const { getAllUsers, getPublicationsByUser } = props;

  const {
    match: {
      params: { userId },
    },
  } = props;

  const { users, loading: loadingUsers, error: errorUsers } = userReducer;

  const {
    publications,
    loading: loadingPublications,
    error: errorPublications,
  } = publicationReducer;

  useEffect(() => {
    if (!users.length) {
      getAllUsers().then(() => getPublicationsByUser(userId));
    } else {
      getPublicationsByUser(userId);
    }
  }, [getAllUsers, getPublicationsByUser, userId, users.length]);

  const renderPublications = () => {
    const elements = publications.find((e) => e.userId === userId);
    return (
      <section>
        {elements?.publications.map(({ title, body, id }) => (
          <div key={id}>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>
    );
  };

  if (loadingUsers || loadingPublications) {
    return <Spinner />;
  }

  if (errorUsers || errorPublications) {
    return <Fatal message={errorUsers} />;
  }

  const user = users.find((e) => e.id.toString() === userId.toString());

  return (
    <>
      <h1>Publicaciones de {user?.name}</h1>
      {renderPublications()}
    </>
  );
};

const mapStateToProps = ({ userReducer, publicationReducer }) => ({
  userReducer,
  publicationReducer,
});

const mapDispatchToProps = {
  getAllUsers,
  getPublicationsByUser,
};

export const Publications = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationsComponent);
