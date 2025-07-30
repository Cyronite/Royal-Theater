import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Mail, Lock, User, Theater } from "lucide-react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-[#181310] border-2 border-[#312621] rounded-2xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Theater color="#E7B008" size={40} />
          <h2 className="text-3xl font-bree text-white">Create Account</h2>
          <p className="text-gray-400 text-center font-inter">
            Join us to start booking your favorite movies and shows
          </p>
        </div>
        
        <form onSubmit={handleEmailSignUp} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-[#0C0A09] border-2 border-[#312621] text-white py-3 pl-12 pr-4 rounded-lg font-inter focus:border-[#E7B008] focus:outline-none transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#0C0A09] border-2 border-[#312621] text-white py-3 pl-12 pr-4 rounded-lg font-inter focus:border-[#E7B008] focus:outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#0C0A09] border-2 border-[#312621] text-white py-3 pl-12 pr-4 rounded-lg font-inter focus:border-[#E7B008] focus:outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-inter text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4A0813] to-[#cd0022] text-white py-3 rounded-lg font-inter font-semibold hover:scale-[1.02] transition-all duration-300 transform hover:shadow-[0_0_20px_#000000]"
          >
            Create Account
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#312621]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-400 bg-[#181310] font-inter">
              Or sign up with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full border-2 border-[#312621] text-white py-3 rounded-lg font-inter hover:bg-[#312621] transition-colors flex items-center justify-center gap-2"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;