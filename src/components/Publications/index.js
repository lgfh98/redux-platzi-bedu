import { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "../general/Spinner";
import { Fatal } from "../general/Fatal";
import * as userActions from "../../actions/userActions";

const PublicationsComponent = ({ users, getAllUsers, loading, error }) => {
  useEffect(() => {
    if (!users.length) {
      getAllUsers();
    }
  }, [getAllUsers, users.length]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Fatal message={error} />;
  }

  return (
    <>
      <h1>Publicaciones de</h1>
    </>
  );
};

const mapStateToProps = (state) => state.userReducer;

export const Publications = connect(
  mapStateToProps,
  userActions
)(PublicationsComponent);
