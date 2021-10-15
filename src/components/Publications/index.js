import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import * as userActions from "../../actions/userActions";
import * as PublicationActions from "../../actions/PublicationActions";

const { getAll: getAllUsers } = userActions;
const { getAll: getAllPublications, getByUser: getPublicationsByUser } =
  PublicationActions;

const PublicationsComponent = (props) => {
  // reducer states
  const { userReducer, publicationReducer } = props;

  // actions
  const { getAllUsers, getPublicationsByUser } = props;

  // param props
  const {
    match: {
      params: { key },
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
      getAllUsers().then(() => getPublicationsByUser(key));
    } else {
      getPublicationsByUser(key);
    }
  }, [getAllUsers, getPublicationsByUser, key, users.length]);

  if (loadingUsers) {
    return <Spinner />;
  }

  if (errorUsers) {
    return <Fatal message={errorUsers} />;
  }

  return (
    <>
      <h1>Publicaciones de</h1>
    </>
  );
};

const mapStateToProps = ({ userReducer, publicationReducer }) => ({
  userReducer,
  publicationReducer,
});

const mapDispatchToProps = {
  getAllUsers,
  getAllPublications,
  getPublicationsByUser,
};

export const Publications = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationsComponent);
