import Layout from "@/components/layout/Layout";
import WorkshopBooking from "@/components/sections/WorkshopBooking";
import WorkshopContent from "@/components/sections/WorkshopContent";

export default function Workshop() {
  return (
    <Layout>
      <WorkshopContent />
      <div className="container py-8">
        <h2 className="text-2xl font-semibold mb-4">Workshop Booking</h2>
        <p className="text-foreground/80 mb-6 max-w-3xl">We offer hands-on workshops for design students and enthusiasts. Fill the form below to request a booking.</p>
        <WorkshopBooking />
      </div>
    </Layout>
  );
}
