import React, { useState } from 'react';
import { handleEmailSignup, handleGoogleSignup } from '../functions/sign';
import { toast } from 'react-toastify';
import NavBar from './Navbar';

const SignUp = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Handle email/password signup
  const handleEmailSignUpClick = async () => {
    if (!agreeToTerms) {
      toast.error('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    try {
      await handleEmailSignup(email, password);
      toast.success('Signup successful! Welcome!');
      // Optionally, redirect the user or update the UI
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    }
  };

  // Handle Google signup
  const handleGoogleSignUpClick = async () => {
    try {
      await handleGoogleSignup();
      toast.success('Google signup successful! Welcome!');
      // Optionally, redirect the user or update the UI
    } catch (error) {
      toast.error(`Google signup failed: ${error.message}`);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{
        '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(255,255,255)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')",
        fontFamily: 'Manrope, "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col items-center justify-center">
       <NavBar />
        <div className="flex flex-1 justify-center items-center w-full py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1 items-center">
            <h3 className="text-[#111418] tracking-light text-2xl font-bold leading-tight text-center pb-2 pt-5">
              Create a new account
            </h3>
            <div className="flex flex-col w-full max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Username</p>
                <input
                  placeholder="Enter your username"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col w-full max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Password</p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col w-full max-w-[480px] gap-4 px-4 py-3">
              <label className="flex flex-col w-full">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Email</p>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="w-full max-w-[480px] px-4">
              <label className="flex gap-x-3 py-3 flex-row">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#dce0e5] border-2 bg-transparent text-[#1980e6] checked:bg-[#1980e6] checked:border-[#1980e6] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#dce0e5] focus:outline-none"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <p className="text-[#111418] text-base font-normal leading-normal">
                  I agree to the Terms of Service and Privacy Policy
                </p>
              </label>
            </div>
            <div className="w-full max-w-[480px] px-4 py-3">
              <button
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                onClick={handleEmailSignUpClick}
              >
                <span className="truncate">Sign up</span>
              </button>
            </div>
            {/* Google Signup Button */}
            <div className="w-full max-w-[480px] px-4 py-3">
              <button
                className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] border border-[#dce0e5]"
                onClick={handleGoogleSignUpClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="truncate">Sign up with Google</span>
              </button>
            </div>
            <p className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Already have an account?
            </p>
            <div className="w-full max-w-[480px] px-4 py-3">
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;