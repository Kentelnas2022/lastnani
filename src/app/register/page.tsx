"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purok, setPurok] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Step 1: Sign up user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Step 2: Insert resident details
    const user = data.user;
    if (user) {
      const { error: insertError } = await supabase.from("residents").insert([
        {
          user_id: user.id,
          name,
          mobile,
          purok,
          address,
        },
      ]);
      if (insertError) {
        setError(insertError.message);
        return;
      }
    }

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <form
        onSubmit={handleRegister}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create Account
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-3">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" />
          <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" />
          <input type="text" placeholder="Purok" value={purok} onChange={(e) => setPurok(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
