"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DoodleBackground } from "@/components/ui-brutalist/doodles";
import { MouseFollower } from "@/components/ui-brutalist/mouse-follower";
import { AnimatedButton } from "@/components/ui-brutalist/animated-button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      router.push("/admin");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white pattern-bg relative">
      <DoodleBackground />
      <MouseFollower />

      <div className="brutalist-container bg-white p-10 max-w-md w-full mx-auto rounded-xl border-4 border-primary text-center transform rotate-1">
        <h1 className="text-4xl font-bold mb-6 threed-text">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label htmlFor="email" className="font-semibold text-black block mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="font-semibold text-black block mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none"
              required
            />
          </div>

          <div className="pt-4 text-center">
            <AnimatedButton animation="shake" variant="primary" size="lg">
              {loading ? "Logging in..." : "Login"}
            </AnimatedButton>
          </div>
        </form>
      </div>
    </div>
  );
}
