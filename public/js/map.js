mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/standard", // Use the standard style for the map
  projection: "globe", // display the map as a globe
  zoom: 10, // initial zoom level, 0 is the world view, higher values zoom in
  center: listing.geometry.coordinates, // center the map on this longitude and latitude
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();

map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

const el = document.createElement("div");
el.innerHTML = '<i class="fa-solid fa-compass map-icon"></i>';

const popup = new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
  `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;"><h5>${listing.title}</h5><p style="text-align: left; padding-left: 1rem">Exact location will be provided after booking</p></div>`
);

el.addEventListener("mouseenter", () =>
  popup.addTo(map).setLngLat(listing.geometry.coordinates)
);
el.addEventListener("mouseleave", () => popup.remove());

const marker1 = new mapboxgl.Marker(el)
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);
