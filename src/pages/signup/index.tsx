import { useState, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const [authError, setAuthError] = useState<Error | null>(null)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>()
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  function handleSignIn() {
    router.push('/signup');
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {

    const newUser = {
      email: data.email,
      password: data.password,
      isEmailVerified: false
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Vérifier si l'utilisateur existe déjà
    if (users.some((user: any) => user.email === newUser.email)) {
      setAuthError(new Error("Cet e-mail est déjà utilisé pour un autre compte"));
      return;
    }

    // Ajouter le nouvel utilisateur dans le localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setAuthError(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', { required: true })} />
              {errors.email && <div className="invalid-feedback">Email is required</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: true, minLength: 6 })} ref={passwordRef} />
              {errors.password && errors.password.type === 'required' && <div className="invalid-feedback">Password is required</div>}
              {errors.password && errors.password.type === 'minLength' && <div className="invalid-feedback">Password must be at least 6 characters long</div>}
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} {...register('confirmPassword', { validate: value => value === watch('password') })} ref={confirmPasswordRef} />
              {errors.confirmPassword && <div className="invalid-feedback">Passwords do not match</div>}
            </div>
            <div className="container">
              <div className="row">
                <button type="submit" className="btn btn-primary">Sign up</button>
                {authError && <div className="alert alert-danger mt-3">{authError.message}</div>}
                <button className="success" onClick={handleSignIn}>Creer un compte</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
