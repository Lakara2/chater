import { getUserData } from '@/api/api';
import { GetServerSideProps } from 'next';
import { UserData } from '../../../utils/types';

const profile = ({userData}: {userData: UserData}) => {
console.log(userData);

    return (
      <div className="container">
        <div className="card profile-card">
          <div className="card-body">
            <h1 className="card-title">Profile</h1>
            
            <p className="card-text">Name: {userData.user?.name}</p>
            <p className="card-text">Email: {userData.user?.email}</p>
            <p className="card-text">ID: {userData.user?.id}</p>
            <p className="card-text">Status: {userData.user?.status}</p>
          </div>
        </div>
      </div>
    );
};

export default profile;
export const getServerSideProps: GetServerSideProps = getUserData;
