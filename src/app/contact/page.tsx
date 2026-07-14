import { Nav, PageHeader } from "../(ui)/components";

export default function ContactPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Contact" subtitle="We'd love to hear from you." />
      <section className="container-max pb-12 grid md:grid-cols-2 gap-8">
        <form className="elevated p-6 space-y-4">
          <input className="elevated h-11 px-3" placeholder="Name" />
          <input className="elevated h-11 px-3" placeholder="Email" />
          <textarea className="elevated h-32 p-3" placeholder="Message" />
          <button className="btn btn-accent">Send</button>
        </form>
        <div className="elevated p-6">
          <div className="text-sm text-[--color-muted-foreground]">support@houseofelectronics.sl</div>
          <div className="text-sm text-[--color-muted-foreground] mt-2">Mon–Sat, 9am–6pm</div>
        </div>
      </section>
    </div>
  );
}


