import { useState } from "react";

export default function WorkshopForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, preferredDate, notes }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSuccess("Thanks — your workshop booking request has been received. We'll contact you to confirm.");
      setName("");
      setEmail("");
      setPhone("");
      setPreferredDate("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4">
      {success && <div className="rounded-md bg-foreground/5 p-3 text-sm text-foreground">{success}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
        <input value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} type="date" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none" />
      </div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What you'd like to learn / expectations" className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground outline-none h-28" />
      <div>
        <button type="submit" disabled={loading} className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold tracking-wide uppercase text-background hover:opacity-95">
          {loading ? "Sending..." : "Request Booking"}
        </button>
      </div>
    </form>
  );
}
