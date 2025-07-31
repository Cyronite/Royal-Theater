import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Mail, Lock, User, Theater } from "lucide-react";

type NavProps = {
  setUid: (uid: string | null) => void;
};

export default function SignUp({ setUid }: NavProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handledb = async (userid: string, userName: string) => {
    const response = await fetch("http://localhost:5000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: userid,
        name: userName,
      }),
    });
    if (!response.ok) {
      // Try to parse error message from backend
      let errorMsg = `Response ${response.status}`;
      try {
        const data = await response.json();
        if (data?.error) errorMsg = data.error;
      } catch {}
      throw new Error(errorMsg);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userid = user.uid;

    try {
      await handledb(userid, name); 
    } catch (backendErr: any) {
      if (
        backendErr.message === "User already exists" ||
        backendErr.message.includes("already exists") ||
        backendErr.message.includes("409")
      ) {
        await user.delete();
        setError("This email is already registered. Please log in instead.");
        return; 
      } else {
        throw backendErr;
      }
    }


    setUid(userid);
    localStorage.setItem("uid", userid);
    setError(null);
    navigate("/dashboard");
  } catch (err: any) {
    setError(getFriendlyErrorMessage(err));
  }
};


  const handleGoogleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const userid = result.user.uid;
      const userName =
        result.user.displayName || result.user.email?.split("@")[0] || "User";

      try {
        await handledb(userid, userName); 
      } catch (backendErr: any) {
        if (
          backendErr.message === "User already exists" ||
          backendErr.message.includes("already exists") ||
          backendErr.message.includes("409")
        ) {
          await auth.signOut(); 
          setError("This Google account is already registered. Please log in instead.");
          return;
        } else {
          throw backendErr;
        }
      }

    setUid(userid);
    localStorage.setItem("uid", userid);
    setError(null);
      navigate("/dashboard");
    }
  } catch (err: any) {
    setError(getFriendlyErrorMessage(err));
  }
};

  function getFriendlyErrorMessage(error: any) {
    if (!error?.code) return error?.message || "An unknown error occurred.";
    switch (error.code) {

      case "auth/email-already-in-use":
        return "This email is already registered. Please log in or use another email.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/popup-closed-by-user":
        return "Sign-up cancelled. Please try again.";
      case "auth/popup-blocked":
        return "Popup was blocked. Please enable popups for this site.";
      default:
        return error.message || "An error occurred. Please try again.";
    }
  }

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
