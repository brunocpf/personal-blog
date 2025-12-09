import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname, searchParams, origin } = req.nextUrl;

  if (pathname === "/blog") {
    const page = searchParams.get("page") ?? "1";
    const category = searchParams.get("category");

    const rewriteURL = category
      ? new URL(`/blog/categories/${category}/1`, origin)
      : new URL(`/blog/pages/${page}`, origin);

    return NextResponse.rewrite(rewriteURL);
  }

  if (pathname.startsWith("/blog/categories")) {
    const segments = pathname.split("/");
    const category = segments[3];
    const page = searchParams.get("page") ?? "1";

    if (category) {
      const rewriteURL = new URL(
        `/blog/categories/${category}/${page}`,
        origin,
      );
      return NextResponse.rewrite(rewriteURL);
    }

    return NextResponse.redirect(new URL("/blog/pages/1", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog", "/blog/categories/:path*"],
};
