import { Nav, PageHeader } from "../(ui)/components";

export default function PrivacyPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Privacy Policy" subtitle="How House of Electronics collects, uses, and protects your information." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Information we collect</h2>
          <p>We collect the details you provide when you place an order or contact us — your name, phone number, email, and delivery address — along with basic device and usage data that helps us keep the store fast and secure.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">How we use it</h2>
          <p>Your information is used to process orders, arrange delivery, provide warranty and repair support, and — only with your consent — to share offers from House of Electronics. We never sell your personal data.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. We retain records only as long as needed to serve you and to meet our legal obligations in Sierra Leone.</p>
        </div>
      </section>
    </div>
  );
}
