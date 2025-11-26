'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Subheading1, Headline, Body2, Label,} from "../typography";
import { ListChecks } from "../../design-system/components/icons";
import Image from "next/image";
import { Button } from "@/src/components/ui/buttons";
import Link from "next/link";
import { usersDB } from "../../data/user";


export default function LoginPage() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();

const handleLogin = () => {
  if (!username.trim() || !password.trim()) {
    alert("Enter a valid username and password");
    return;
  }

  // Check if user exists in the small JSON DB
  const user = usersDB[username];

  if (!user) {
    alert("User does not exist");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password");
    return;
  }

  // Save logged-in user
  localStorage.setItem("taskify_user", username);

  router.push("/dashboard");
};


return (
<div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">

{/* MAIN LOGIN BOX */}
<div className="flex flex-col md:flex-row w-full max-w-4xl min-h-[550px] md:h-[550px]
bg-[#2c2c38] text-white rounded-xl overflow-hidden shadow-2xl">

{/* LEFT SIDE */}
<div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
  
  {/* Logo + Title */}
  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
    <ListChecks className="w-8 h-8 sm:w-10 sm:h-10 stroke-white" />
    <Subheading1 className="text-2xl sm:text-3xl font-bold text-white">
      Taskify
    </Subheading1>
  </div>


  {/* Intro Text */}
  <Headline className="text-white mb-1 text-xl sm:text-2xl">Hello,</Headline>
    <Headline className="text-xl sm:text-2xl"> welcome back</Headline>
  <Body2 className="mb-6 sm:mb-8 text-white/80 text-sm sm:text-base">
    Hey, welcome back to your special place.
  </Body2>

  {/* Username */}
  <input
    className="border border-gray-500 bg-transparent text-white px-3 py-2 rounded-md w-full sm:w-3/4 mb-3 sm:mb-4 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-purple-400"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />

  {/* Password */}
  <input
    type="password"
    className="border border-gray-500 bg-transparent text-white px-3 py-2 rounded-md w-full sm:w-3/4 mb-1 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-purple-400"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />


  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 md:gap-14 mb-4 sm:mb-6">
  <Label className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
  <input 
type="checkbox" 
className="h-4 w-4 rounded border-gray-400 bg-transparent flex-shrink-0"
  />
Remember me
</Label>
<Link
href="/forgot-password"
className="text-primary hover:text-primary-hover underline-offset-4 hover:underline text-xs sm:text-sm"
>
Forgot Password?
</Link>

</div>

  {/* Login Button */}
  <Button
    onClick={handleLogin}
    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full sm:w-1/2 transition-colors text-sm sm:text-base"
  >
    Login
    
  </Button>

<div className="mt-3 sm:mt-4 w-full sm:w-3/4 text-xs sm:text-sm text-white/80">
Don’t have an account?{" "}
<Link
href="/register"
className="text-primary hover:text-primary-hover underline-offset-4 hover:underline"
>
Sign up
</Link>
</div>
</div>

{/* RIGHT SIDE IMAGE */}
<div className="hidden md:block md:w-1/2 relative h-full">
  <Image
    src="/sidepic.jpg"
    alt="Login side illustration"
    fill
    className="object-cover"
  />
  
</div>

</div>
</div>
);
}