import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import { Publication } from "../Publication";
import * as userActions from "../../actions/UserActions";
import * as PublicationActions from "../../actions/PublicationActions";
import * as CommentActions from "../../actions/CommentActions";

const { getAll: getAllUsers } = userActions;
const { getByUser: getPublicationsByUser } = PublicationActions;
const { getByPublication: getCommentsByPublication } = CommentActions;

const PublicationsComponent = (props) => {
  const { userReducer, publicationReducer } = props;
  const { getAllUsers, getPublicationsByUser, getCommentsByPublication } =
    props;

  const {
    match: {
      params: { userId },
    },
  } = props;

  const { users, loading: loadingUsers, error: errorUsers } = userReducer;

  const {
    publicationsByUser,
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
    const filter = publicationsByUser.find((e) => e.userId === userId);
    return (
      <>
        {filter?.userPublications.map((publication) => (
          <Publication
            key={publication.id}
            {...publication}
            // handleLoadComments={() =>
            //   getCommentsByPublication(publication.id, userId, false)
            // }
            handleLoadComments={getCommentsByPublication}
            userId={userId}
          />
        ))}
      </>
    );
  };

  if (loadingUsers || loadingPublications) {
    return <Spinner />;
  }
  if (errorUsers) {
    return <Fatal message={errorUsers} />;
  }

  const user = users.find((e) => e.id.toString() === userId.toString());

  return (
    <>
      {user && <h1>Publicaciones de {user?.name}</h1>}
      {renderPublications()}
      {errorPublications && <Fatal message={errorPublications} />}
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
  getCommentsByPublication,
};

export const Publications = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationsComponent);
