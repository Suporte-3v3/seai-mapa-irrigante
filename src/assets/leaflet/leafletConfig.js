// leafletConfig.js
// Importe o Leaflet
import L from 'leaflet';

// Defina a URL para os recursos do Leaflet (ícones e imagens)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('dist/images/marker-icon-2x.png'),
  iconUrl: require('dist/images/marker-icon.png'),
  shadowUrl: require('dist/images/marker-shadow.png'),
  });

export default L;

