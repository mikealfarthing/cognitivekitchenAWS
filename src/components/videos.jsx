const videos = [
  { id: "ep6k3Ofcf2s", title: "Binging with Babish: The Deadly Cheeseburger from The Menu" },
  { id: "6wxIGsk1BFM", title: "Binging with Babish: Brazil's Most Popular Street Food" },
  { id: "z1DiIqfO5Qo", title: "Gordon Ramsay: Simple Recipes To Get Into Cooking" },
  { id: "mhDJNfV7hjk", title: "Gordon Ramsay: Quick & Simple Recipes" },
];

export default function Videos() {
  return (
    <div className="page">
      <h1>Cooking Videos</h1>
      <p className="subtitle">Enjoy this month's cooking videos.</p>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <div className="frame-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}