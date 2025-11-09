'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';

const login = () => {
  //initialization
  const loginForm = useFormik({
    initialValues: {

      email: '',
      password: ''

    },
    onSubmit: (values) => {
      console.log("form Values:", values);
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          toast.success('Login Successful')
          console.log(result.data);
          localStorage.setItem('token', result.data.token);
          // localStorage.setItem('user',JSON.stringify(result.data.user));

        }).catch((err) => {
          toast.error('Login Failed');
          console.log(err);
        });

    }
  });
  return (
    <body className='flex justify-center items-center h-screen'>

      <div className='border-2 border-violet-300 w-1/3 p-10 rounded-xl bg-white/60 bg'>

        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <form onSubmit={loginForm.handleSubmit}>


          <label htmlFor="">Email</label>
          <input type='email' id='email'
            onChange={loginForm.handleChange}
            value={loginForm.values.email}
            className='block border w-full px-4 py-2 rounded mb-6 mt-1' />
          <label htmlFor="">Password</label>
          <input type='password' id='password'
            onChange={loginForm.handleChange}
            value={loginForm.values.password}
            className='block border w-full px-4 py-2 rounded mb-6 mt-1' />
          <button className='block w-full p-2 bg-violet-500 hover:bg-violet-700 duration-300 text-white rounded'>Submit</button>
          <a href='' className='block text-violet-500 text-center'>Not register Yet?Login Now</a>
        </form>

      </div>
    </body>
  );
};

export default login;