type Props = {
  label: string;
  date: string;
  time: string;
  place: string;
  address: string;
  index: number;
};

export default function EventCard({ label, date, time, place, address, index }: Props) {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place + ", " + address);
  return <article className="event-card">
    <div className="event-card-top"><div><span>{index === 0 ? "THE PROMISE" : "THE CELEBRATION"}</span><h3>{label}</h3></div><span className="event-number">0{index + 1}</span></div>
    <p className="event-date">{date}</p><p className="event-time">{time}</p>
    <p className="event-place">{place}</p><p className="event-address">{address}</p>
    <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`Buka lokasi ${place} di Google Maps`}>Lihat lokasi <span aria-hidden="true">↗</span></a>
  </article>;
}
