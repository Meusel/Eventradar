# EventRadarApp – Architecture Documentation

## 📌 Overview
EventRadarApp is a mobile-first application designed to help students and young adults discover events in Halle (Saale). The architecture emphasizes simplicity, usability, and GDPR compliance.

---

## 🏗 System Architecture

### 1. Frontend
- Built with Python frameworks (Kivy/BeeWare).
- Provides mobile UI for event discovery, filtering, and map visualization.
- Minimalist design to reduce cognitive load.

### 2. Backend
- Flask/Django REST API.
- Handles event data, filtering, sorting, and user preferences.
- Provides endpoints for:
  - `/events` – list of events
  - `/events/{id}` – event details
  - `/filters` – category, price, distance

### 3. Database
- SQLite for local development.
- PostgreSQL for production.
- Tables:
  - `events` (title, date, time, location, category, price)
  - `users` (preferences, consent settings)
  - `organizers` (event updates)

### 4. Map & Location Services
- `geopy` for distance calculation.
- `folium` or OpenStreetMap APIs for visualization.

### 5. Privacy & Security
- GDPR-compliant consent management.
- Local storage where possible.
- Encrypted server-side data.

---

## 🔄 Data Flow
1. User opens app → frontend requests events from backend.
2. Backend queries database → applies filters/sorting.
3. Map service calculates distances → returns event list + coordinates.
4. Frontend displays events in chronological order with progressive disclosure.

---

## 📚 Theoretical Foundations
- Cognitive Load Theory (Sweller, 1988)
- Gestalt Principles for UI clarity
- Privacy-by-Design (GDPR Art. 25)
- Affordance Theory (Gibson, 1979)

