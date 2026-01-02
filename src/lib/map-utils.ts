import L from 'leaflet';

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Musik':
      return 'hsl(var(--chart-1))';
    case 'Kunst':
      return 'hsl(var(--chart-2))';
    case 'Party':
      return 'hsl(var(--chart-3))';
    case 'Sport':
      return 'hsl(var(--chart-4))';
    case 'Workshop':
      return 'hsl(var(--chart-5))';
    default:
      return 'hsl(var(--primary))';
  }
};

export const createCustomIcon = (color: string) => {
  const markerHtml = `
    <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${color}"/>
    </svg>`;

  return new L.DivIcon({
    html: markerHtml,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};
