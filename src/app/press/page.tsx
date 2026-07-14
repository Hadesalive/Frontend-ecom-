import { Nav, PageHeader } from "../(ui)/components";

export default function PressPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Press" subtitle="Media resources and company information for House of Electronics." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">About us</h2>
          <p>Type A House of Electronics (SL) Ltd. is a Sierra Leone retailer of premium electronics and expert repairs, built on a simple promise: where technology comes home.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Media enquiries</h2>
          <p>For interviews, brand assets, or partnership enquiries, contact our team through the Support Center and we’ll respond promptly.</p>
        </div>
      </section>
    </div>
  );
}
