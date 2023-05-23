import { AuthContext } from '@/pages/api/authContext';
import { useContext } from 'react';

const Profile = () => {
  const { authUser } = useContext(AuthContext);

  if (authUser.user) {
    return (
      <div className="container">
        <div className="card profile-card">
          <div className="card-body">
            <h1 className="card-title">Profile</h1>
            <p className="card-text">Name: {authUser.user.name}</p>
            <p className="card-text">Email: {authUser.user.email}</p>
            <p className="card-text">ID: {authUser.user.id}</p>
            <p className="card-text">Token: {authUser.user.token}</p>
            <p className="card-text">Status: {authUser.user.status}</p>
          </div>
        </div>
      </div>
    );
  }
  return <p>Not authenticated</p>;
};

export default Profile;
