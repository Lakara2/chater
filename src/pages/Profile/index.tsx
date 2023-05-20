import { useContext } from 'react';
import { AuthContext } from '@/pages/api/context/authContext';

const Profile = () => {
  const { authUser } = useContext(AuthContext);

if (authUser.user) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {authUser.user.name}</p>
      <p>Email: {authUser.user.email}</p>
      <p>id : {authUser.user.id}</p>
      <p>token : {authUser.user.token}</p>
      <p>status : {authUser.user.status}</p>
    </div>
  );
}

return <p>Not authenticated</p>;
};
export default Profile;