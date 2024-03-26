import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const accessToken = token ? JSON.parse(token.value).token : null;
  const user = token ? JSON.parse(token.value).user : null;
  const url = new URL(request.url);

  const response = await fetch(`${url.origin}/api/v1/access/verify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const isAccessValid = await response.json();

  if (isAccessValid.email === user) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/home"],
};
