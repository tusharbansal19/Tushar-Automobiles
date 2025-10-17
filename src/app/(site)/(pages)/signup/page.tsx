import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up | Tushar Automobiles - Create Your Account",
  description: "Join Tushar Automobiles today! Create your account to access premium automobile parts, exclusive deals, and professional automotive services.",
  keywords: "sign up, register, create account, tushar automobiles, automobile parts, join"
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
