import { getAuthSession } from "~/cookies/auth.cookie";

export default async function withAuth(request: Request) {
  const authSession = await getAuthSession(
    request.headers.get("Cookie")
  );

  return authSession.has('user')
}