import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import CollectionsGrid from "@/components/sections/CollectionsGrid";
import FeaturedCarousel from "@/components/sections/FeaturedCarousel";
import EditorialBanner from "@/components/sections/EditorialBanner";
import InstagramStrip from "@/components/sections/InstagramStrip";
import ContactForm from "@/components/forms/ContactForm";
import WorkshopBooking from "@/components/sections/WorkshopBooking";
import { usePage } from "@/lib/api";

export default function Index() {
  const { data: about } = usePage("about");

  return (
    <Layout>
      <div id="home">
        <Hero />
      </div>

      <div id="about" className="container py-16">
        <h2 className="text-3xl font-semibold mb-4">About</h2>
        <div className="max-w-3xl text-foreground/85">{about?.content ?? "The Applique is a monochrome atelier creating home furnishing textiles focusing on sofa covers, bedsheets, razai, pillow covers and table cloths."}</div>
      </div>


      <div id="collections">
        <CollectionsGrid />
      </div>

      <div id="featured">
        <FeaturedCarousel />
      </div>

      <div id="workshop" className="container py-16">
        <h2 className="text-3xl font-semibold mb-4">Workshop Booking</h2>
        <p className="text-foreground/80 mb-6 max-w-3xl">We offer hands-on workshops for design students and enthusiasts. Fill the form below to request a booking.</p>
        <WorkshopBooking />
      </div>

      <div id="contact" className="container py-16">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-foreground/80 mb-6 max-w-3xl">For catalogue enquiries or wholesale requests, please get in touch.</p>
        <ContactForm />
      </div>

      <EditorialBanner />
      <InstagramStrip />
    </Layout>
  );
}
