import { ArrowUp, ArrowUpRight } from "@/components/site-icon";

export async function PageFooter() {
  "use cache";
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <span>© {new Date().getFullYear()} Bruno Fernandes</span>
        <div className="footer-links">
          <a
            href="https://github.com/brunocpf"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/brunofernandes-/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="mailto:brunocpf@outlook.com">
            Email <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="#top">
            Top <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
