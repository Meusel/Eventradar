import { Suspense } from 'react';
import App from './app';

export default function HomePage() {
  return (
    <Suspense fallback={<div>Wird geladen...</div>}>
      <App />
    </Suspense>
  );
}
