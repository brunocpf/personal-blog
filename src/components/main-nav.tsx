import { NavLink } from "@/components/nav-link";
import { ThemeToggler } from "@/components/theme-toggler";

export function MainNav() {
  return (
    <div className="hidden gap-4 md:flex md:items-center">
      <nav className="my-4 flex items-center gap-3">
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
