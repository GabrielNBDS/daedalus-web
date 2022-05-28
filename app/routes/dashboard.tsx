import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import withAuth from "~/utils/withAuth";

export const loader: LoaderFunction = async ({ request }) => {
  if(!await withAuth(request)) return redirect('/login')

  return null
}

export default function Dashboard() {
  return (
    <h1>Dashboard</h1>
  )
}