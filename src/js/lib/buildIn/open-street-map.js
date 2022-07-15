import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

export default (item) => {
  if (item.getAttribute('data-already') === 'true') {
    return;
  }
  item.setAttribute('data-already', 'true');

  const multiple = !!item.getAttribute('data-multiple');
  const lat = item.getAttribute('data-lat');
  const lng = item.getAttribute('data-lng');
  const zoom = item.getAttribute('data-zoom');
  const msg = item.getAttribute('data-msg');
  const markers = item.getAttribute('data-markers');
  const messages = item.getAttribute('data-messages');
  const map = Leaflet.map(item).setView([lat, lng], zoom);

  delete Leaflet.Icon.Default.prototype._getIconUrl; // eslint-disable-line no-underscore-dangle
  Leaflet.Icon.Default.mergeOptions({
    iconUrl: icon,
    iconRetinaUrl: icon2x,
    shadowUrl: iconShadow,
  });

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  if (multiple && markers) {
    /**
     * Multiple marker
     */
    const points = markers.split('|');
    const panels = messages.split('[[:split:]]');
    points.forEach((point, i) => {
      const latlng = point.split(',');
      if (latlng.length === 2) {
        const view = Leaflet.marker([latlng[0].trim(), latlng[1].trim()], {
          draggable: false,
        }).addTo(map);
        if (panels[i]) {
          view.bindPopup(panels[i]);
        }
      }
    });
  } else {
    /**
     * Single marker
     */
    const view = Leaflet.marker(map.getCenter(), {
      draggable: false,
    }).addTo(map);
    if (msg) {
      view.bindPopup(msg);
    }
  }
};
