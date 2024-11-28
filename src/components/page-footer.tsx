import { ContactLinks } from "@/components/contact-links";

export function PageFooter() {
  return (
    <footer className="m-4">
      <div className="m-2">
        <ContactLinks />
      </div>
      <hr />
      <p className="p-2 text-center text-sm">
        &copy; {new Date().getFullYear()} bruno-fernandes.dev | Developed by
        Bruno Fernandes
      </p>
    </footer>
  );
}
