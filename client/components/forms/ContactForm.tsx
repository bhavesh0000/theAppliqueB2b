// import { useState } from "react";

// export default function ContactForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [company, setCompany] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, company, message }),
//       });
//       if (!res.ok) throw new Error("Failed to submit");
//       setSuccess("Thank you — we received your enquiry. We'll be in touch soon.");
//       setName("");
//       setEmail("");
//       setCompany("");
//       setMessage("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit enquiry. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={submit} className="max-w-2xl space-y-4">
//       {success && <div className="rounded-md bg-foreground/5 p-3 text-sm text-foreground">{success}</div>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
//         <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
//       </div>
//       <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company / Institution" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
//       <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none h-36" />
//       <div>
//         <button type="submit" disabled={loading} className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase text-background hover:opacity-95">
//           {loading ? "Sending..." : "Send Enquiry"}
//         </button>
//       </div>
//     </form>
//   );
// }


import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      setSuccess("Thank you! We've received your enquiry and sent a confirmation to your email. We'll be in touch within 24-48 hours.");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      {success && (
        <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm text-green-800">
          {success}
        </div>
      )}
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name *"
          className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none focus:border-foreground/50 transition-colors"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none focus:border-foreground/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number *"
          className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none focus:border-foreground/50 transition-colors"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company / Institution (Optional)"
          className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none focus:border-foreground/50 transition-colors"
        />
      </div>

      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can we help? *"
        className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none focus:border-foreground/50 transition-colors h-36 resize-none"
      />

      <div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-foreground px-6 py-3 text-sm font-semibold tracking-wide uppercase text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        * Required fields
      </p>
    </form>
  );
}
