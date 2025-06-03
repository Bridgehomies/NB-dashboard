import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth")?.value;

  if (auth === "true") {
    redirect("/admin");
  } else {
    redirect("/sign-in");
  }
}
