import React, { useState, useCallback, useRef } from "react";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import logo from "../../assets/logo_removebg.png";
import vitaglyph_logo from "../../assets/vitaglyph_logo.png";
import googgle from "../../assets/google.svg";
import facebook from "../../assets/facebook.svg";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import showAlert from "../../components/ConfirmationDialog/ConfirmationDialog";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef(null); // Create a ref for the email input

  // Memoize the particlesInit function
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Memoize the particles options
  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#6366f1",
      },
      links: {
        color: "#6366f1",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    const isLogin = document.activeElement.name === "Login";
    const isRegister = document.activeElement.name === "Register";

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      setIsAuthenticated(true);
    } catch (error) {
      // First focus the email field
      emailInputRef.current?.focus();
      // emailInputRef.current?.select();

      // Then show the alert
      showAlert({
        icon: "error",
        title: "Error!",
        text: "Incorrect email or password.",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-100 p-4 overflow-hidden">
      {/* Particles Background - now with memoized options */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 120,
            particles: {
              color: { value: "#00ff88" }, // Neon green
              links: {
                color: "#00ff88",
                distance: 150,
                enable: true,
                opacity: 0.7,
                width: 2,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: "bounce",
                speed: 2,
                straight: false,
              },
              number: { density: { enable: true }, value: 80 },
              opacity: { value: 0.5 },
              shape: { type: "square" }, // Circuit-like squares
              size: { value: { min: 1, max: 3 } },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                onClick: {
                  enable: true,
                  mode: "push",
                },
              },
            },
          }}
        />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-xl/20 rounded-3xl w-full max-w-sm h-[42.3rem] sm:h-[40.7rem]">
          {/* LOGO HEADER */}
          <div className="flex flex-col items-center justify-center bg-white rounded-t-3xl py-6 gap-1 sm:gap-0 text-[#12121C]">
            {/* <div className="flex "> */}
            <img
              src={vitaglyph_logo} // Change this to your actual logo path
              alt="Logo"
              className="w-13 h-13"
            />
            {/* <div className="text-3xl sm:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-pulse">
              VitaGlyph
            </div> */}

            <div className="text-xl font-black sm:font-bold sm:text-lg">
              Welcome to VitaGlyph
            </div>
            {/* </div> */}
            <span className="">Please login using the form below.</span>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col px-9 md:px-11 py-3 sm:py-0 "
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 cursor-pointer"
              >
                Email
              </label>
              <div className="relative">
                <IoPersonOutline className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  ref={emailInputRef} // Add the ref here
                  placeholder="example@gmail.com"
                  className="w-full mt-1 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  md
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="text-gray-600 cursor-pointer"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Forgot Password Ongoing")}
                  className="text-blue-500 text-sm underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <TbLockPassword className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full mt-1 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* ✅ Remember Me checkbox */}
              <div className="flex items-center mt-3">
                <input
                  id="rememberMe"
                  type="checkbox"
                  defaultChecked
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-gray-600 font-semibold cursor-pointer"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="submit"
                value="Log in"
                name="Login"
                className="w-full py-3 text-white font-semibold rounded-lg 
             bg-gradient-to-r from-purple-600 to-blue-500 shadow-md 
             hover:brightness-110 transition duration-300 ease-in-out cursor-pointer"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-4 text-gray-500 font-medium">Or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg py-3 shadow-sm hover:bg-gray-100 transition font-semibold cursor-pointer"
                onClick={() => alert("Google login ongoing")}
              >
                <img
                  src={googgle}
                  alt="Google"
                  className="w-5 h-5 sm:h-4 sm:w-4"
                />
                Continue with Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-3 bg-white text-gray-700 border rounded-lg py-3 border-gray-300 shadow-sm hover:bg-gray-100 transition font-semibold cursor-pointer"
                onClick={() => alert("Facebook login ongoing")}
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-6 h-6 bg-white rounded sm:h-5 sm:w-5"
                />
                Continue with Facebook
              </button>
            </div>

            {/* Sign Up Text */}
            <p className="text-center text-gray-600 flex gap-3 items-center justify-center">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer font-semibold"
                onClick={() => alert("Redirect to Sign Up")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
