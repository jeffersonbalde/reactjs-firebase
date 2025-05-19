import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setIsAuthenticated }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    if (document.activeElement.name === 'Login') {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => Swal.showLoading(),
          willClose: () => {
            setIsAuthenticated(true);
            Swal.fire({
              icon: 'success',
              title: 'Successfully logged in!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      } catch (error) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => Swal.showLoading(),
          willClose: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Incorrect email or password.',
              showConfirmButton: true,
            });
          },
        });
      }
    } else if (document.activeElement.name === 'Register') {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => Swal.showLoading(),
          willClose: () => {
            setIsAuthenticated(true);
            Swal.fire({
              icon: 'success',
              title: 'Successfully registered and logged in!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white shadow-xl/30 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h1>
        
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mt-1 mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mt-1 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="flex gap-4">
          <input
            type="submit"
            value="Login"
            name="Login"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md cursor-pointer transition"
          />
          <input
            type="submit"
            value="Register"
            name="Register"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md cursor-pointer transition"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;