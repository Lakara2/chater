import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaLogin } from '../../utils/schema';
import { LoginDataType } from '../../utils/types';
import { signIn } from '@/pages/api/axi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Signin() {
const {
  register,
  handleSubmit,
  formState:{ errors }
} = useForm <LoginDataType>  ({resolver : yupResolver(schemaLogin)})

const router = useRouter();

const onSubmit = async (data:LoginDataType) => {
  signIn(data);
  const response = await signIn(data)    
  const token = response.data.user!.token;
  if(response.status === 200){
    Cookies.set("jwt", token)
    await router.push("/profile")
  }
}
  return (
    <>
      <main className="form-signin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="mb-4" src="./icons/joystick.png" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
            {...register("email", {required: true})}
              type="email"
              name='email'
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
            {...register("password", {required: true})}
              name='password'
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <Link href="/signup">
            <button type="button" className="btn btn-secondary">
              S'inscrire
            </button>
          </Link>
          <p className="mt-5 mb-3 text-muted">© Lakara</p>
        </form>
      </main>
    </>
  );
}