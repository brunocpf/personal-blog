import { ContactLinks } from "@/components/contact-links";

export function PageFooter() {
  return (
    <footer className="m-4">
      <div className="m-2">
        <ContactLinks />
      </div>
      <hr />
      <p className="text-sm text-center p-2">
        &copy; {new Date().getFullYear()} bruno-fernandes.dev | Developed by
        Bruno Fernandes
      </p>
    </footer>
  );
}
