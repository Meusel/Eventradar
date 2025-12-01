# Eventradar
A university project developing a mobile app that helps students and young adults discover local events, connect with communities, and create memorable experiences.

📌 Overview

EventRadarApp is designed to help students and young adults easily discover, filter, and explore local events. The app emphasizes simplicity, usability, and privacy compliance (GDPR) while offering a modern, minimalist interface.

Key features include:

    Discover upcoming events in Halle (Saale)

    Filter by category, price, distance, and student specials

    Chronological sorting and progressive information disclosure

    Interactive map with distance visualization

    GDPR-compliant privacy and data control

🎯 Project Goals

    Reduce cognitive load in event discovery

    Provide intuitive filtering and sorting mechanisms

    Ensure transparency and user control over personal data

    Deliver a minimalist, aesthetic interface with clear orientation

    Support mobility decisions through distance-based visualization

🚀 Tech Stack (Python-based)
Layer	Tools & Libraries
Frontend (Mobile) -- 	Kivy or BeeWare for Python-native mobile apps
Backend (API) --	Flask or Django REST Framework
Database --	SQLite (easy start) → PostgreSQL (scalable option)
Map & Location Services	-- geopy(distance calculation), folium (map visualization), OpenStreetMap APIs
Filtering & Categorization	-- Custom Python logic with pandas or direct SQL queries
Privacy & Security	-- Django’s built-in authentication, cryptography library for encryption, GDPR-compliant consent flows
((Deployment	-- Simple hosting on Heroku/Render, or Dockerized Python app))

🛠 Development Approach

    Conceptualization

        Define design theory and project structure plan

        Identify core modules (event discovery, filtering, privacy, maps)

    Implementation

        Build backend API in Flask/Django

        Integrate SQLite for local testing, PostgreSQL for production

        Develop mobile UI with Kivy/BeeWare

        Add map visualization and distance filters

    Privacy & GDPR Compliance

        Implement Privacy-by-Design principles

        Default settings: minimal data collection, opt-in consent

        Local storage where possible, encrypted server storage

    Testing & Iteration

        Usability testing with students

        Daily event updates from organizers

        Error prevention and clear feedback messages

📚 Theoretical Foundations

    Cognitive Load Theory (Sweller, 1988) – reducing extraneous load

    Gestalt Principles – visual clarity and orientation

    Affordance Theory (Gibson, 1979) – intuitive interaction with environment

    Information Foraging Theory (Pirolli & Card, 1999) – cost cues like distance guide decisions

    Privacy-by-Design (GDPR Art. 25) – embedding privacy into architecture
