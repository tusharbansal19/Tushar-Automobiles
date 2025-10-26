import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Sign In | Tushar Automobiles - Access Your Account",
  description: "Sign in to your Tushar Automobiles account to access exclusive deals, track orders, and manage your automobile parts purchases.",
  keywords: "sign in, login, tushar automobiles, account access, automobile parts"
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
