import { NextResponse } from "next/server.js";
import type { NextRequest } from "next/server.js";

export function proxy(req: NextRequest) {
  const { pathname, searchParams, origin } = req.nextUrl;

  if (pathname === "/blog") {
    const page = searchParams.get("page") ?? "1";
    const category = searchParams.get("category");

    const rewriteURL = category
      ? new URL(`/blog/categories/${category}/${page}`, origin)
      : new URL(`/blog/pages/${page}`, origin);

    return NextResponse.rewrite(rewriteURL);
  }

  if (
    pathname === "/blog/categories" ||
    pathname.startsWith("/blog/categories/")
  ) {
    const segments = pathname.split("/");
    const category = segments[3];
    const pathPage = segments[4];
    // Canonical category URLs already resolve to a page. Rewriting them again
    // can loop through the proxy and used to reset pagination back to page 1.
    if (pathPage && !searchParams.has("page")) {
      return NextResponse.next();
    }
    const page = searchParams.get("page") ?? pathPage ?? "1";

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
