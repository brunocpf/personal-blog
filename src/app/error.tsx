"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="status-page container">
      <h1>Unable to load this page</h1>
      <p>The page couldn’t load. Please try again in a moment.</p>
      <div className="hero-actions">
        <button className="solid-button" onClick={reset}>
          Try again
        </button>
        <Link className="text-link" href="/">
          Back home
        </Link>
      </div>
    </section>
  );
}
