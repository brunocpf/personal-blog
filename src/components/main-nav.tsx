import { NavLink } from "@/components/nav-link";
import { ThemeToggler } from "@/components/theme-toggler";

export function MainNav() {
  return (
    <div className="desktop-nav">
      <nav aria-label="Main navigation">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/blog">Writing</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </nav>
      <ThemeToggler />
    </div>
  );
}
