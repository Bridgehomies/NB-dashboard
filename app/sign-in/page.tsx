"use client"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignInPage() {
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin")
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    login()
    router.push("/admin")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={handleLogin} className="px-6 py-3 text-white bg-black rounded">
        Sign In
      </button>
    </div>
  )
}
// "use client"

// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function SignInPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Simulate sign-in and redirect
//     localStorage.setItem("auth", "true")
//     document.cookie = "auth=true; path=/"
//     router.push("/admin")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fafbfd] px-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardContent className="py-8 px-6">
//           <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">Welcome Back</h1>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email" className="text-sm font-medium">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="john@example.com"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="password" className="text-sm font-medium">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
//               Sign In
//             </Button>
//           </form>
//           <p className="text-sm text-center mt-4">
//             Don’t have an account?{' '}
//             <Link href="/sign-up" className="text-primary font-medium hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
