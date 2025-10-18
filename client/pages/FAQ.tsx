import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  imageCount?: number;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What is Hand Block Printing?",
    answer: "Hand block printing is a traditional Indian textile art where skilled artisans carve designs onto wooden blocks and manually print patterns on natural fabrics using eco-friendly dyes. At The Applique, every product — from cushion covers to kaftans — is crafted by hand, preserving centuries-old artistry with a modern aesthetic.",
    imageCount: 2,
  },
  {
    id: 2,
    question: "What types of products do you manufacture?",
    answer: "We produce a wide range of block printed home décor and apparel, including:\n\n• Table linens (tablecloths, runners, napkins)\n• Curtains and cushion covers\n• Bedspreads and quilts\n• Apparel (kaftans, dresses, scarves, and tunics)\n• Custom designs for retail and bulk orders\n\nWe also provide bespoke textile printing for brands and designers.",
    imageCount: 2,
  },
  {
    id: 3,
    question: "Do you offer wholesale or bulk orders?",
    answer: "Yes. We primarily operate in a B2B (Business-to-Business) model and supply to:\n\n• Boutiques and lifestyle stores\n• Interior décor brands\n• Fashion labels\n• Hotels and resorts\n• Importers and distributors\n\nOur minimum order quantity (MOQ) varies by product type, but we also offer small-batch sampling for new clients.",
    imageCount: 2,
  },
  {
    id: 4,
    question: "Can you create custom or exclusive designs?",
    answer: "Absolutely. We offer custom hand block printing services tailored to your brand's needs — from fabric selection and color matching to exclusive pattern development. Our design team collaborates closely with buyers to create unique, private-label collections.",
    imageCount: 2,
  },
  {
    id: 5,
    question: "Where are your products made?",
    answer: "All our products are handcrafted in Jaipur, Rajasthan (India) — the heart of the block printing industry. We work directly with local artisans, ensuring ethical production, fair wages, and sustainable practices.",
    imageCount: 2,
  },
  {
    id: 6,
    question: "What fabrics do you use for printing?",
    answer: "We use high-quality cotton, linen, mulmul, cambric, voile, and silk blends, depending on the product. All fabrics are AZO-free, eco-friendly, and suitable for export to international markets.",
    imageCount: 2,
  },
  {
    id: 7,
    question: "Do you ship internationally?",
    answer: "Yes, we export globally. Our clients are based across Europe, the USA, Canada, the Middle East, and Australia. We handle safe packaging, export documentation, and door delivery through trusted logistics partners.",
    imageCount: 2,
  },
  {
    id: 8,
    question: "What is your production and delivery timeline?",
    answer: "Production lead time depends on order size and customization, typically:\n\n• Sampling: 7–10 days\n• Bulk orders: 30–45 days\n\nWe ensure timely dispatch and transparent communication throughout the process.",
    imageCount: 2,
  },
  {
    id: 9,
    question: "What makes The Applique different from other suppliers?",
    answer: "• 100% authentic hand block printing done by skilled artisans\n• Custom design and color development options\n• Eco-conscious dyes and sustainable fabrics\n• Small to large order flexibility\n• Direct manufacturer pricing without intermediaries\n• Dedicated quality checks and international packaging standards",
    imageCount: 2,
  },
  {
    id: 10,
    question: "How can I place an order or get a quotation?",
    answer: "You can reach us via:\n\n• Email: info@theapplique.co.in\n• Fill out our \"Enquiry Form\" on our website\n\nOur team will share the product catalog, price list, and sample options within 24 hours.",
    imageCount: 2,
  },
  {
    id: 11,
    question: "Do you offer white-label or private-label services?",
    answer: "Yes, we provide private labeling, branding, and custom packaging for global retailers and boutique owners. You can add your own tags, labels, and packaging designs for a complete brand experience.",
    imageCount: 2,
  },
  {
    id: 12,
    question: "Are your dyes and fabrics eco-friendly?",
    answer: "Yes. We strictly use natural, AZO-free, and low-impact dyes. Our printing process minimizes water use and promotes sustainable textile manufacturing — making our products both eco-friendly and artisan-made.",
    imageCount: 2,
  },
  {
    id: 13,
    question: "How do you ensure quality in bulk production?",
    answer: "Each piece is inspected multiple times — from block printing to finishing. We maintain international export quality control standards to ensure consistency, color fastness, and durability.",
    imageCount: 2,
  },
  {
    id: 14,
    question: "Can you handle custom packaging or branding for export?",
    answer: "Yes. We offer export-ready packaging, labeling and branding options to match your country's import standards. Our team ensures that each shipment meets the buyer's custom packaging specifications.",
    imageCount: 2,
  },
  {
    id: 15,
    question: "Do you participate in trade shows or exhibitions?",
    answer: "Yes, we frequently participate in textile trade fairs and export exhibitions in India and abroad to showcase our latest hand block printed collections.",
    imageCount: 2,
  },
  {
    id: 16,
    question: "How can we collaborate as a designer or retailer?",
    answer: "We love collaborating with designers, stylists, and global brands. You can share your design concepts or sketches, and our artisans will bring them to life using traditional hand block printing with modern detailing.",
    imageCount: 2,
  },
  {
    id: 17,
    question: "What countries do you currently export to?",
    answer: "Our major export markets include:\n\n• Spain, France, Italy, Germany, UK\n• USA, Canada\n• UAE, Qatar, Saudi Arabia\n• Australia, New Zealand\n\nWe're constantly expanding our presence with new partners worldwide.",
    imageCount: 2,
  },
  {
    id: 18,
    question: "Why choose The Applique for your business?",
    answer: "• Trusted B2B hand block printing manufacturer from Jaipur\n• Custom & bulk printing capabilities\n• Competitive factory pricing\n• Ethical and sustainable production\n• Global shipping & export expertise\n• Personalized client service",
    imageCount: 2,
  },
  {
    id: 19,
    question: "Do you provide samples before confirming bulk orders?",
    answer: "Yes, we can send paid or refundable samples depending on order size. Sampling helps you test print quality, fabric, and craftsmanship before placing your main order.",
    imageCount: 2,
  },
  {
    id: 20,
    question: "What's your return or replacement policy for B2B orders?",
    answer: "Since we make custom and made-to-order products, returns are limited to cases of manufacturing defects or shipping damage. We ensure every order passes strict quality checks before dispatch.",
    imageCount: 2,
  },
];

function FAQSection({ faq, index }: { faq: FAQItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
      }}
    >
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10">
        {/* Question */}
        <div className="px-8 py-8 border-b border-white/5">
          <h3 className="text-xl md:text-2xl font-bold text-foreground relative inline-block">
            <span className="relative z-10">{faq.question}</span>
            <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-primary/10 to-primary/5 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </h3>
        </div>

        {/* Answer */}
        <div className="px-8 py-8">
          <p className="text-foreground/75 text-base leading-relaxed whitespace-pre-line font-light tracking-wide">
            {faq.answer}
          </p>

          {/* Image Placeholders */}
          {faq.imageCount ? (
            <div
              className={`mt-8 grid gap-4 ${
                faq.imageCount > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {Array.from({ length: faq.imageCount }).map((_, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-xl overflow-hidden h-48 md:h-56 bg-gradient-to-br from-muted/30 to-muted/10 border border-white/10 backdrop-blur-sm flex items-center justify-center group transition-all duration-500 hover:border-white/20 ${
                    isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${300 + idx * 150}ms` : "0ms",
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Placeholder content */}
                  <div className="text-center relative z-10">
                    <svg
                      className="w-16 h-16 mx-auto mb-3 text-foreground/20 group-hover:text-foreground/30 transition-colors duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-foreground/40 font-medium">
                      Image Placeholder
                    </p>
                    <p className="text-xs text-foreground/30 mt-1">
                      Add image URL
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative py-20 md:py-32 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl blur-3xl bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10"></div>

          <div className="container  mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="relative inline-block">
                  Frequently Asked
                  <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-primary/20 to-primary/10 -z-10"></span>
                </span>
                {" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                Every journey comes with questions — and we love that. Whether you're curious about our process, timelines, materials, or just how it all works, you're in the right place.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="relative">
          <div className="container mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <FAQSection key={faq.id} faq={faq} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-20 md:py-32">
          {/* Background glow */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-t from-primary/5 via-transparent to-transparent -z-10"></div>

          <div className="container  mx-auto">
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl px-8 md:px-12 py-12 md:py-16 text-center hover:border-white/20 transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-foreground/60 mb-8">
                Can't find the answer you're looking for? Please reach out to us directly.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="mailto:info@theapplique.co.in"
                  className="px-8 py-3 bg-gradient-to-r from-foreground to-foreground/90 text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-foreground/20 transition-all duration-300 hover:scale-105"
                >
                  Email Us
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 border border-foreground/20 text-foreground rounded-lg font-semibold hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
