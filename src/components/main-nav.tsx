import { ThemeToggler } from "@/components/theme-toggler";
import { NavLink } from "@/components/nav-link";

export function MainNav() {
  return (
    <div className="hidden md:flex md:items-center gap-4">
      <nav className="my-4 flex gap-3 items-center">
        <div>
          <NavLink href="/">Home</NavLink>
        </div>
        <div>
          <NavLink href="/blog">Blog</NavLink>
        </div>
        <div>
          <NavLink href="/about">About</NavLink>
        </div>
        <div>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </nav>
      <ThemeToggler />
    </div>
  );
}
