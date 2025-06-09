import { redirect } from "next/navigation"
import { AdminAuth } from "@/components/admin-auth"
import { cookies } from "next/headers"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin-authenticated")?.value === "true"

  if (!isAuthenticated) {
    return <AdminAuth />
  }

  redirect("/admin/dashboard")
}
