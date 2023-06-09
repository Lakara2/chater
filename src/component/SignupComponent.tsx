import { useRouter } from 'next/router';
import SignupForm from './SignupForm';

const SignupComponent: React.FC = () => {
  const router = useRouter();

  const handleSignupSuccess = () => {
    router.push('/login');
  };

  return (<>
    <h2 className="card-title">Inscription</h2>
    <SignupForm onSignupSuccess={handleSignupSuccess} />
      </>
  );
};

export default SignupComponent;
