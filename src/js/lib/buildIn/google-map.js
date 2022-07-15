import { Loader } from 'google-maps';
import queryString from 'query-string';

let googlePromise;

const loadGoogleMap = (key) => {
  if (googlePromise) {
    return googlePromise;
  }
  const options = {};
  const loader = new Loader(key, options);
  googlePromise = loader.load();
  return googlePromise;
};

export default async (elm) => {
  const query = queryString.parse(elm.src.replace(/^[^?]*\?/, ''));
  const msgs = elm.alt.split('[[:split:]]');
  if (!query.key) {
    return;
  }

  const google = await loadGoogleMap(query.key);
  const output = document.createElement('div');
  const size = query.size.split('x');
  const width = size[0] || null;
  const height = size[1] || null;
  const centerLatLng = query.center.split(',');
  const markerCollectionStack = [];
  const googleInfoWindow = new google.maps.InfoWindow();
  const googleMap = new google.maps.Map(output, {
    // eslint-disable-line no-new
    center: { lat: parseFloat(centerLatLng[0]), lng: parseFloat(centerLatLng[1]) },
    zoom: parseInt(query.zoom, 10),
  });

  output.className = elm.className;
  output.style.width = `${width}px`;
  output.style.height = `${height}px`;
  output.style.overflow = 'hidden';
  elm.parentNode.replaceChild(output, elm);

  if (typeof query.markers === 'string') {
    query.markers = [query.markers];
  }

  query.markers.forEach((marker) => {
    const params = marker.split('|');
    const markerCollection = {
      icon: null,
      optAry: [],
    };
    if (!params.length) {
      return;
    }
    for (let i = 0; i < params.length; i += 1) {
      // icon
      if (params[i].indexOf('icon:') === 0) {
        markerCollection.icon = {
          icon: params[i].slice(5),
          shadow: new google.maps.MarkerImage(
            'http://maps.google.co.jp/mapfiles/ms/icons/msmarker.shadow.png',
            new google.maps.Size(59, 32),
            new google.maps.Point(0, 0),
          ),
        };
        // markers's latlng
      } else {
        const latLng = params[i].split(',');
        if (!latLng[0].length) {
          return;
        } // latlngの不正なマーカー
        markerCollection.optAry.push({
          position: new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1])),
          map: googleMap,
        });
      }
    }
    markerCollectionStack.push(markerCollection);
  });

  // marker collectionを展開してプロット
  let msgI = 0;
  markerCollectionStack.forEach((markerCollection) => {
    for (let i = 0; i < markerCollection.optAry.length; i += 1) {
      const markerOption = markerCollection.optAry[i];
      const marker = new google.maps.Marker(Object.assign(markerOption, markerCollection.icon));

      // info windowのコンテンツがあれば表示（不正なマーカーがあった場合はズレる）
      if (msgs[msgI] !== undefined && width >= 180) {
        ((gMarker, msg) => {
          if (msg) {
            google.maps.event.addListener(gMarker, 'click', () => {
              googleInfoWindow.setOptions({
                content: msg,
              });
              googleInfoWindow.open(googleMap, gMarker);
            });
          }
        })(
          marker,
          msgs[msgI]
            .replace(/\[\[:quot:\]\]/gim, '"')
            .replace(/\[\[:lt:\]\]/gim, '<')
            .replace(/\[\[:gt:\]\]/gim, '>')
            .replace(/\[\[:amp:\]\]/gim, '&'),
        );
      }
      msgI += 1;
    }
  });
};
