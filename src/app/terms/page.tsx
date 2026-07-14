import { Nav, PageHeader } from "../(ui)/components";

export default function TermsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Terms of Service" subtitle="The terms that govern your use of House of Electronics." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Using our store</h2>
          <p>By browsing or ordering from House of Electronics you agree to these terms. You must provide accurate details when placing an order and be authorised to use your chosen payment method.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Orders &amp; pricing</h2>
          <p>All prices are shown in New Leones (NLe) and include applicable taxes unless stated otherwise. We may correct pricing errors and cancel affected orders with a full refund. Product availability is not guaranteed until your order is confirmed.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Liability</h2>
          <p>Products are covered by the warranty described on our Warranty page. To the extent permitted by law, House of Electronics is not liable for indirect or incidental losses arising from use of a product.</p>
        </div>
        <p className="text-sm">Type A House of Electronics (SL) Ltd.</p>
      </section>
    </div>
  );
}
