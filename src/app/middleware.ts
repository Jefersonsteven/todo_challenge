import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Middleware: ", request.url);
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  // Aqui se configura el path que se va a redirigir
  matcher: ["/login", "/", "/home", "/signup"],
};
