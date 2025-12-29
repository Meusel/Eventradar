'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '@/lib/types';
import { createCustomIcon, getCategoryColor } from '@/lib/map-utils';
import { getEvents } from "@/lib/events";
import { Button } from '@/components/ui/button';
import { useUserLocation } from '@/hooks/use-user-location';
import L from 'leaflet';
import { LocateFixed } from 'lucide-react';

interface EventMapProps {
  events: Event[];
  categories: string[];
  onFilterChange: (category: string) => void;
}

const Legend = () => {
  const allEvents = getEvents();
  const categories = [...new Set(allEvents.map((event) => event.category))];

  return (
    <div className="legend bg-white p-2 rounded-md shadow-lg"> 
      <h4 className="font-bold mb-2">Legende</h4>
      <ul>
        {categories.map((category) => (
          <li key={category} className="flex items-center mb-1">
            <span
              className="w-4 h-4 inline-block mr-2 rounded-full"
              style={{ backgroundColor: getCategoryColor(category) }}
            ></span>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

const RecenterButton = ({ location }: { location: { latitude: number, longitude: number } | null }) => {
    const map = useMap();
    const recenter = () => {
        if (location) {
            map.flyTo([location.latitude, location.longitude], 14);
        }
    };
    return location ? <Button onClick={recenter} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] rounded-full" size="icon"><LocateFixed className="w-5 h-5"/></Button> : null;
};


const EventMap: React.FC<EventMapProps> = ({ events, categories, onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState('Alle');
  const { location, error } = useUserLocation();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilterChange(category);
  }

  const userIcon = new L.DivIcon({
      html: `
        <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="blue" stroke="white" stroke-width="2" />
        </svg>`,
      className: 'custom-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
  });

  return (
    <div className="relative">
       <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
            <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className="rounded-full flex-shrink-0"
            >
                {category}
            </Button>
            ))}
        </div>
      </div>
      <MapContainer center={[51.4828, 11.9697]} zoom={13} scrollWheelZoom={false} className="h-[500px] w-full rounded-lg"> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
            <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
                <Popup>Dein Standort</Popup>
            </Marker>
        )}
        {events.map(event => {
          const distance = location ? calculateDistance(location.latitude, location.longitude, event.latitude, event.longitude).toFixed(2) : null;
          return (
            <Marker key={event.id} position={[event.latitude, event.longitude]} icon={createCustomIcon(getCategoryColor(event.category))}>
                <Popup>
                <b>{event.title}</b><br />
                {event.location}
                {distance && <><br /><i>{distance} km entfernt</i></>}
                </Popup>
            </Marker>
          )
        })}
        <RecenterButton location={location}/>
      </MapContainer>
      <div className="absolute top-2 right-2 z-[1000]">
        <Legend />
      </div>
    </div>
  );
};

export default EventMap;
