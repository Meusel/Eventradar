'use client';

import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '@/lib/types';
import { createCustomIcon } from '@/lib/map-utils';
import { getCategoryColor } from '@/lib/category-colors';
import { Button } from '@/components/ui/button';
import { useUserLocation } from '@/hooks/use-user-location';
import L, { Marker as LeafletMarker } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EventMapProps {
  events: Event[];
  categories: string[];
  onFilterChange: (category: string) => void;
  activeCategory: string;
  selectedEventId?: string | null;
}

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

const MapUpdater = ({ event, markerRef }: { event: Event | null, markerRef: LeafletMarker | null }) => {
    const map = useMap();
    useEffect(() => {
        if (event && markerRef) {
            map.flyTo([event.latitude, event.longitude], 15, {
                animate: true,
                duration: 1.5
            });
            setTimeout(() => {
                markerRef.openPopup();
            }, 1600);
        }
    }, [event, map, markerRef]);
    return null;
}

const RecenterButton = ({ location }: { location: { latitude: number, longitude: number } | null }) => {
    const map = useMap();
    const recenter = () => {
        if (location) {
            map.flyTo([location.latitude, location.longitude], 14);
        }
    };
    return location ? <Button onClick={recenter} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] rounded-full" size="icon"><LocateFixed className="w-5 h-5"/></Button> : null;
};

const userIcon = new L.DivIcon({
    html: `
        <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="blue" stroke="white" stroke-width="2" />
        </svg>`,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const MapEvents = memo(({ events, location, selectedEvent, markerRefs, handleMoreInfoClick, handleGetDirectionsClick }: any) => {
    return (
        <>
            {location && (
                <Marker position={[location.latitude, location.longitude]} icon={userIcon}>
                    <Popup>Dein Standort</Popup>
                </Marker>
            )}
            {events
                .filter((event: Event) => typeof event.latitude === 'number' && typeof event.longitude === 'number')
                .map((event: Event) => {
                const distance = location ? calculateDistance(location.latitude, location.longitude, event.latitude, event.longitude).toFixed(2) : null;
                return (
                    <Marker
                        key={event.id}
                        ref={markerRefs(event.id)}
                        position={[event.latitude, event.longitude]}
                        icon={createCustomIcon(getCategoryColor(event.category))}
                    >
                        <Popup>
                            <b>{event.title}</b><br />
                            {event.location}
                            {distance && <><br /><i>{distance} km entfernt</i></>}
                            <br />
                            {event.price > 0 ? `${event.price} €` : 'Kostenlos'}
                            <div className="flex space-x-2 mt-2">
                                <Button onClick={() => handleMoreInfoClick(event.id)} size="sm">
                                    Mehr Infos
                                </Button>
                                <Button onClick={() => handleGetDirectionsClick(event.location)} size="sm">
                                    Anfahrt
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
            <MapUpdater event={selectedEvent} markerRef={selectedEvent ? markerRefs(selectedEvent.id) : null} />
        </>
    )
});
MapEvents.displayName = 'MapEvents';

const EventMap: React.FC<EventMapProps> = ({ events, categories, onFilterChange, activeCategory, selectedEventId }) => {
  const { location } = useUserLocation();
  const router = useRouter();
  const markerRefs = useRef<{ [key: string]: LeafletMarker | null }>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (selectedEventId) {
      const event = events.find(e => e.id === selectedEventId);
      setSelectedEvent(event || null);
    } else {
      setSelectedEvent(null);
    }
  }, [selectedEventId, events]);

  const setMarkerRef = (id: string) => (ref: LeafletMarker | null) => {
    markerRefs.current[id] = ref;
  };

  const getMarkerRef = (id: string) => {
      return markerRefs.current[id];
  }

  const handleCategoryChange = (category: string) => {
    onFilterChange(category);
  }

  const handleMoreInfoClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  const handleGetDirectionsClick = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS
      ? `maps://?q=${encodedAddress}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative">
       <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
                const color = getCategoryColor(category);
                const isActive = activeCategory === category;
                return (
                    <Button
                        key={category}
                        variant={isActive ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                        className="rounded-full flex-shrink-0"
                        style={category !== 'Alle' ? {
                            backgroundColor: isActive ? color : 'white',
                            color: isActive ? 'white' : color,
                            borderColor: color,
                            borderWidth: '1px'
                        } : {}}
                    >
                        {category}
                    </Button>
                )
            })}
        </div>
      </div>
      <MapContainer center={[51.4828, 11.9697]} zoom={13} scrollWheelZoom={false} className="h-[500px] w-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterButton location={location}/>
        <MapEvents
            events={events}
            location={location}
            selectedEvent={selectedEvent}
            markerRefs={setMarkerRef}
            handleMoreInfoClick={handleMoreInfoClick}
            handleGetDirectionsClick={handleGetDirectionsClick}
        />
      </MapContainer>
    </div>
  );
};

export default EventMap;
