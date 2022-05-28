import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const paths = ['/', '/songs', '/index', '/playlist', '/recents', '/recommendations', '/search'];
  if (paths.includes(path)) {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("http://localhost:3000/auth/signin");
    // If user is authenticated, continue.
  }
}