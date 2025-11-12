const form = document.getElementById('ip-form');
const input = document.getElementById('ip-input');
const ipAddress = document.getElementById('ip-address');
const locationEl = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const myIcon = L.icon({
  iconUrl: 'images/icon-location.svg',
});

let marker;

const API_KEY = "at_P5CPJkElNruOt7Jvr05St9hQb3z1u";

async function fetchIP(ip = "") {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`;
  const res = await fetch(url);
  const data = await res.json();

  ipAddress.textContent = data.ip;
  locationEl.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezone.textContent = `UTC ${data.location.timezone}`;
  isp.textContent = data.isp;

  const lat = data.location.lat;
  const lng = data.location.lng;
  map.setView([lat, lng], 13);
  if (marker) marker.remove();
  marker = L.marker([lat, lng], {icon: myIcon}).addTo(map);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchIP(input.value.trim());
});

fetchIP(); 
