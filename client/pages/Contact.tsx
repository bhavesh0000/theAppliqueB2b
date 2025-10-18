import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/forms/ContactForm";

export default function Contact() {
  return (
    <Layout>
      <div className="container py-16">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-foreground/80 mb-6 max-w-3xl">For catalogue enquiries or wholesale requests, please get in touch.</p>
        <ContactForm />
      </div>
    </Layout>
  );
}
