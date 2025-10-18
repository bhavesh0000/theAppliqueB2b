import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import EditorialBanner from "@/components/sections/EditorialBanner";
import InstagramStrip from "@/components/sections/InstagramStrip";
import HomeShowcase from "@/components/sections/HomeShowcase";

export default function Home() {
  return (
    <Layout>
      <div>
        <Hero />
      </div>

      <HomeShowcase />
      <EditorialBanner />
      <InstagramStrip />
    </Layout>
  );
}
