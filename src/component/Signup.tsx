import { AuthContext } from '@/pages/api/authContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import SignupForm from './SignupForm';

const Signup: React.FC = () => {
  const router = useRouter();
  const { setAuthUser } = useContext(AuthContext);

  const handleSignupSuccess = () => {
    router.push('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Inscription</h2>
              <SignupForm onSignupSuccess={handleSignupSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
