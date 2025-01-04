
const randos = [
  './randos/martel.gpx',
  './randos/cavagnac-circuit_des_4_croix.gpx',
  './randos/circuit_de_la_reculee_d_autoire.gpx'
];

const velo = [
  './randos/vegenne_curemonte.gpx'
];

var GPX = [];

window.addEventListener("DOMContentLoaded", function () {
  var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  });

  var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'});


  var ign = L.tileLayer(
      "https://data.geopf.fr/wmts?" +
      "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
      "&STYLE=normal" +
      "&TILEMATRIXSET=PM" +
      "&FORMAT=image/png"+
      "&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"+
      "&TILEMATRIX={z}" +
      "&TILEROW={y}" +
      "&TILECOL={x}",
      {
        minZoom : 0,
        maxZoom : 18,
                    attribution : "IGN-F/Geoportail",
        tileSize : 256 // les tuiles du Géooportail font 256x256px
      }
  );

  var map = L.map('map', {
      layers: [ign]
  });

  var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "IGN": ign
  };

  var overlayMaps = {
  };

  var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  var homeIcon = L.icon({
    iconUrl: 'randos/home.svg',
    //shadowUrl: 'randos/shadow.svg',
    iconSize:     [30, 45], // size of the icon
    //shadowSize:   [30, 34], // size of the shadow
    iconAnchor:   [15, 45], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 34],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  var home_marker = L.marker([44.984011, 1.715208], {icon: homeIcon}).addTo(map);
  home_marker.bindTooltip("Gîte");

  const options = {
    async: true,
    polyline_options: { color: 'red' },
  };

  const options_velo = {
    async: true,
    polyline_options: { color: 'green' },
  };

  for (const url of randos) {
    const gpx = new L.GPX(url, options).on('loaded', (e) => {
      //map.fitBounds(e.target.getBounds());
      e.target.bindTooltip(e.target.get_name());
      layerControl.addOverlay(e.target, e.target.get_name());
    }).addTo(map);
  }

  for (const url of velo) {
    const gpx = new L.GPX(url, options_velo).on('loaded', (e) => {
      //map.fitBounds(e.target.getBounds());
      e.target.bindTooltip(e.target.get_name());
      layerControl.addOverlay(e.target, e.target.get_name());
    }).addTo(map);
  }

  map.fitBounds([
    [45.08, 1.5],
    [44.8, 1.95]
]);



});
