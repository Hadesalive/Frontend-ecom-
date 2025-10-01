import { Nav, PageHeader } from "../(ui)/components";

export default function PrivacyPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Privacy Policy" />
      <section className="container-max pb-12 elevated p-6 text-[15px] text-[--color-muted-foreground]">
        <p>We respect your privacy. Placeholder copy for policy.</p>
      </section>
    </div>
  );
}


