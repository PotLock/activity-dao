import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Event, EventLocation } from '../types/event'; // Add this import

const MapComponent = ({ 
  groupedEvents, 
  selectedLocation, 
  setSelectedLocation 
}: {
  groupedEvents: EventLocation[];
  selectedLocation: EventLocation | null;
  setSelectedLocation: (location: EventLocation | null) => void;
}) => {
  useEffect(() => {
    // This ensures Leaflet's CSS is loaded
    import('leaflet/dist/leaflet.css');
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {groupedEvents.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={L.divIcon({
              html: `<div>${location.events.length}</div>`,
              className: 'custom-div-icon',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })}
            eventHandlers={{
              click: () => setSelectedLocation(location),
            }}
          />
        ))}
      </MapContainer>
      {/* Add your selected location popup here if needed */}
    </div>
  );
};

export default MapComponent;
