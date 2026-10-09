import Link from "next/link";

export default function NotFound() {
  return (
    <section className="status-page container">
      <h1>Page not found</h1>
      <p>The page may have moved or the link may be incorrect.</p>
      <Link className="solid-button" href="/blog">
        Browse posts
      </Link>
    </section>
  );
}
