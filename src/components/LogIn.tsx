import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { Mail, Lock, Theater } from "lucide-react";



function getFriendlyErrorMessage(error: any) {
  if (!error?.code) return error?.message || "An unknown error occurred.";
  switch (error.code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/popup-closed-by-user":
      return "Sign-in cancelled. Please try again.";
    case "auth/popup-blocked":
      return "Popup was blocked. Please enable popups for this site.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    default:
      return error.message || "An error occurred. Please try again.";
  }
}
type NavProps = {
  setUid: (uid: string | null) => void;
};
export default function LogIn({setUid }: NavProps) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const checkUserInDB = async (uid: string) => {
    const res = await fetch("http://localhost:5000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });
    return res.ok;
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const exists = await checkUserInDB(uid);
      if (exists) {
        navigate("/dashboard");
        setUid(uid);
        localStorage.setItem("uid", uid);
        setError(null);
      } else {
        await signOut(auth);
        setError("No account found in our system for this user. Please sign up first.");
      }
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
        const exists = await checkUserInDB(result.user.uid);
        if (exists) {
          navigate("/dashboard");
          setUid(result.user.uid)
          localStorage.setItem("uid", result.user.uid);
          console.log("Google user logged in:", result.user.uid);
          setError(null);
        } else {
          await signOut(auth);
          setError("No account found for this Google user. Please sign up first.");
        }
      }
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-[#181310] border-2 border-[#312621] rounded-2xl">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Theater color="#E7B008" size={40} />
          <h2 className="text-3xl font-bree text-white">Welcome Back</h2>
          <p className="text-gray-400 text-center font-inter">
            Sign in to access your account and book your next theatrical experience
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-6">
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
            Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#312621]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-400 bg-[#181310] font-inter">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border-2 border-[#312621] text-white py-3 rounded-lg font-inter hover:bg-[#312621] transition-colors flex items-center justify-center gap-2"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
