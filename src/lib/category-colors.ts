
export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Party':
      return '#FF1493'; // Deep Pink
    case 'Musik':
      return '#00BFFF'; // Deep Sky Blue
    case 'Kultur':
      return '#9400D3'; // Dark Violet
    case 'Sport':
      return '#FF4500'; // Orange Red
    case 'Bildung':
      return '#FFD700'; // Gold
    case 'Workshop':
      return '#32CD32'; // Lime Green
    case 'Kunst':
      return '#FF69B4'; // Hot Pink
    default:
      return '#D2B48C'; // Tan
  }
};
