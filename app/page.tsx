 "use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, CalendarDays, ChevronDown, Heart, Menu, Plane, Search, UserRound, Users, X } from "lucide-react";

type Jet = {
  id: number;
  name: string;
  type: string;
  seats: number;
  range: string;
  speed: string;
  baggage: string;
  price: number;
  image: string;
  amenities: string[];
};

const jets: Jet[] = [
  { id: 1, name: "Phenom 300", type: "Light Jet", seats: 7, range: "3,723 km", speed: "839 km/h", baggage: "2.7 m³", price: 10900, image: "/jets/phenom.jpg", amenities: ["Wi-Fi", "Enclosed Lavatory", "Pets Allowed"] },
  { id: 2, name: "Citation XLS+", type: "Light / Midsize Jet", seats: 8, range: "3,889 km", speed: "815 km/h", baggage: "3.6 m³", price: 12500, image: "/jets/xls.jpg", amenities: ["Wi-Fi", "Enclosed Lavatory", "Full Galley"] },
  { id: 3, name: "Challenger 350", type: "Super Midsize Jet", seats: 9, range: "5,926 km", speed: "870 km/h", baggage: "4.5 m³", price: 18700, image: "/jets/challenger.jpg", amenities: ["Wi-Fi", "Full Galley", "Enclosed Lavatory"] },
  { id: 4, name: "Legacy 500", type: "Midsize Jet", seats: 9, range: "5,788 km", speed: "863 km/h", baggage: "5.7 m³", price: 16900, image: "/jets/legacy.jpg", amenities: ["Wi-Fi", "Full Galley", "Club Seating"] },
  { id: 5, name: "Gulfstream G450", type: "Heavy Jet", seats: 14, range: "8,061 km", speed: "904 km/h", baggage: "4.8 m³", price: 28600, image: "/jets/gulfstream.jpg", amenities: ["Wi-Fi", "Full Galley", "Sleeper Seats"] },
  { id: 6, name: "Global 6500", type: "Ultra Long Range", seats: 14, range: "12,223 km", speed: "956 km/h", baggage: "5.7 m³", price: 39500, image: "/jets/global.jpg", amenities: ["Wi-Fi", "Full Galley", "Private Suite"] }
];

export default function Home() {
  const [origin, setOrigin] = useState("MLA");
  const [destination, setDestination] = useState("LBG");
  const [date, setDate] = useState("2026-09-18");
  const [passengers, setPassengers] = useState(5);
  const [query, setQuery] = useState({ origin: "MLA", destination: "LBG", date: "2026-09-18", passengers: 5 });
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("price");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteJet, setQuoteJet] = useState<Jet | null>(null);

  const results = useMemo(() => {
    let list = type === "All" ? jets : jets.filter(j => j.type === type);
    return [...list].sort((a, b) => sort === "price" ? a.price - b.price : a.seats - b.seats);
  }, [type, sort]);

  const search = () => setQuery({ origin, destination, date, passengers });

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <main>
      <section className="hero text-white">
        <header className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">◢</div>
            <div className="serif text-3xl font-bold">Moga<span className="italic text-[#d9a94a]">Jet</span></div>
          </div>
          <nav className="desktop-nav flex items-center gap-9 text-sm">
            <a href="#" className="text-[#d9a94a]">Home</a>
            <a href="#charter">Charter</a>
            <a href="#fleet">Fleet</a>
            <a href="#safety">Safety</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <span className="text-sm">☎ +1 (800) 555-0123</span>
            <button className="rounded-md border border-[#d9a94a] px-5 py-2">Log in</button>
            <button className="gold-button rounded-md px-5 py-2 font-semibold">Sign up</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
        </header>

        {mobileOpen && (
          <div className="container rounded-lg bg-[#071321] p-5 md:hidden">
            <div className="grid gap-4 text-sm">
              <a href="#charter">Charter</a><a href="#fleet">Fleet</a><a href="#safety">Safety</a><a href="#about">About Us</a><a href="#contact">Contact</a>
            </div>
          </div>
        )}

        <div className="container pt-20 md:pt-24">
          <div className="max-w-xl">
            <h1 className="serif text-5xl leading-[1.02] md:text-7xl">
              Private Aviation,<br/><span className="italic text-[#d9a94a]">Personalized.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-slate-200">Find the perfect private jet for your next journey.</p>
          </div>

          <div id="charter" className="glass mt-9 grid rounded-xl p-2 md:grid-cols-[1fr_1fr_1fr_.75fr_auto]">
            <SearchField label="From" value={origin} sub={origin === "MLA" ? "Malta" : "Paris Le Bourget"} onChange={setOrigin}/>
            <div className="relative">
              <SearchField label="To" value={destination} sub={destination === "LBG" ? "Paris Le Bourget" : "Malta"} onChange={setDestination}/>
              <button onClick={swap} className="absolute -left-4 top-8 rounded-full border border-slate-500 bg-[#071321] p-2"><ArrowRightLeft size={15}/></button>
            </div>
            <SearchField label="Departure" value={date} icon={<CalendarDays size={16}/>} onChange={setDate} type="date"/>
            <SearchField label="Passengers" value={String(passengers)} icon={<Users size={16}/>} onChange={v => setPassengers(Number(v))} type="number"/>
            <button onClick={search} className="gold-button m-1 rounded-lg px-7 font-semibold">Search Jets</button>
          </div>
        </div>
      </section>

      <section id="fleet" className="bg-[#f8fafc] py-9">
        <div className="container">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{results.length} aircraft available</h2>
              <p className="mt-1 text-sm text-slate-600">{query.origin} → {query.destination} · {new Date(query.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} · {query.passengers} Passengers</p>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm">
              <option value="price">Price: Low to High</option>
              <option value="seats">Passenger Capacity</option>
            </select>
          </div>

          <div className="grid gap-7 lg:grid-cols-[235px_1fr]">
            <aside className="card h-fit p-5">
              <h3 className="font-semibold">Refine your search</h3>
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Aircraft Type</p>
                {["All", "Light Jet", "Midsize Jet", "Super Midsize Jet", "Heavy Jet", "Ultra Long Range"].map(t => (
                  <label key={t} className="mb-3 flex items-center gap-3 text-sm">
                    <input type="radio" name="type" checked={type === t} onChange={() => setType(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
              <div className="mt-7 border-t pt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Amenities</p>
                {["Wi-Fi", "Pets Allowed", "Enclosed Lavatory", "Full Galley"].map(a => (
                  <label key={a} className="mb-3 flex items-center gap-3 text-sm"><input type="checkbox"/><span>{a}</span></label>
                ))}
              </div>
            </aside>

            <div className="grid gap-3">
              {results.map(jet => <JetCard key={jet.id} jet={jet} onQuote={() => setQuoteJet(jet)}/>)}
            </div>
          </div>
        </div>
      </section>

      <section id="safety" className="py-20">
        <div className="container grid gap-12 md:grid-cols-3">
          <Info title="Verified operators" text="We work with qualified charter partners and present operator information clearly."/>
          <Info title="Tailored journeys" text="Choose the aircraft, schedule and onboard experience that fit your trip."/>
          <Info title="Personal service" text="A dedicated charter team can coordinate quotes, changes and trip details."/>
        </div>
      </section>

      <footer id="contact" className="bg-[#071321] py-12 text-white">
        <div className="container flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div><div className="serif text-3xl">Moga<span className="italic text-[#d9a94a]">Jet</span></div><p className="mt-2 text-sm text-slate-400">Private Aviation, Personalized.</p></div>
          <div className="text-sm text-slate-400">Quotes shown on this demo are estimates pending operator confirmation.</div>
        </div>
      </footer>

      {quoteJet && <QuoteModal jet={quoteJet} onClose={() => setQuoteJet(null)} />}
    </main>
  );
}

function SearchField({ label, value, sub, icon, onChange, type = "text" }: { label: string; value: string; sub?: string; icon?: React.ReactNode; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="border-b border-white/20 px-5 py-3 md:border-b-0 md:border-r">
      <label className="block text-xs text-slate-300">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        {icon}
        <input value={value} type={type} onChange={e => onChange(e.target.value)} className="w-full bg-transparent text-lg font-semibold outline-none" />
      </div>
      {sub && <div className="text-xs text-slate-300">{sub}</div>}
    </div>
  );
}

function JetCard({ jet, onQuote }: { jet: Jet; onQuote: () => void }) {
  return (
    <article className="card overflow-hidden md:grid md:grid-cols-[250px_1fr_220px]">
      <div className="relative min-h-[190px] bg-slate-200">
        <img src={jet.image} alt={jet.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex justify-between gap-4">
          <div><h3 className="text-2xl font-semibold">{jet.name}</h3><p className="text-sm text-slate-600">{jet.type}</p></div>
          <button aria-label="Favorite" className="text-slate-400"><Heart size={22}/></button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <Stat icon={<Users size={18}/>} value={jet.seats.toString()} label="Passengers"/>
          <Stat icon={<Plane size={18}/>} value={jet.range} label="Range"/>
          <Stat icon={<Plane size={18}/>} value={jet.speed} label="Cruise Speed"/>
          <Stat icon={<span>▣</span>} value={jet.baggage} label="Baggage"/>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{jet.amenities.map(a => <span key={a} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{a}</span>)}</div>
      </div>
      <div className="border-t p-5 md:border-l md:border-t-0">
        <p className="text-xs text-slate-500">Estimated Charter</p>
        <p className="mt-1 text-3xl font-semibold">€{jet.price.toLocaleString()}</p>
        <p className="text-xs text-slate-500">One way · All-in estimate</p>
        <div className="mt-5 grid gap-2"><button className="dark-button rounded-lg px-4 py-3 text-sm font-semibold">View Details</button><button onClick={onQuote} className="rounded-lg border border-[#d9a94a] px-4 py-3 text-sm font-semibold text-[#9b6c15]">Request Quote</button></div>
      </div>
    </article>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div><div className="flex items-center gap-2">{icon}<strong>{value}</strong></div><div className="text-xs text-slate-500">{label}</div></div>;
}

function Info({ title, text }: { title: string; text: string }) {
  return <div><div className="mb-3 h-10 w-10 rounded-full bg-[#f5e7c9] p-2.5 text-[#9b6c15]"><Plane size={20}/></div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>;
}

function QuoteModal({ jet, onClose }: { jet: Jet; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-widest text-[#9b6c15]">MogaJet Charter</p><h2 className="mt-1 text-2xl font-semibold">Request a quote</h2><p className="mt-1 text-sm text-slate-500">{jet.name} · €{jet.price.toLocaleString()} estimated</p></div><button onClick={onClose}><X/></button></div>
        {!sent ? (
          <div className="mt-6 grid gap-4">
            <input placeholder="Full name" className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-[#d9a94a]"/>
            <input placeholder="Email address" type="email" className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-[#d9a94a]"/>
            <input placeholder="Phone number" className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-[#d9a94a]"/>
            <textarea placeholder="Special requests, catering, luggage, pets..." rows={4} className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-[#d9a94a]"/>
            <button onClick={() => setSent(true)} className="gold-button rounded-lg px-5 py-3 font-semibold">Send Quote Request</button>
            <p className="text-xs text-slate-500">This demo sends no real booking or payment. A confirmed charter price must be provided by an operator.</p>
          </div>
        ) : (
          <div className="py-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100 text-green-700">✓</div><h3 className="mt-4 text-xl font-semibold">Request received</h3><p className="mt-2 text-sm text-slate-600">Your MogaJet charter team can now follow up with the operator and confirm the itinerary.</p><button onClick={onClose} className="dark-button mt-6 rounded-lg px-6 py-3">Done</button></div>
        )}
      </div>
    </div>
  );
}