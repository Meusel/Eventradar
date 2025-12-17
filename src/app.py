from flask import Flask, jsonify

# Initialisiere die Flask-App
app = Flask(__name__)

# Beispiel-Route für Events
@app.route("/events", methods=["GET"])
def get_events():
    # Später echte Datenbank-Abfrage, hier nur Dummy-Daten
    events = [
        {"id": 1, "title": "Student Party", "date": "2025-12-05", "location": "Halle Zentrum"},
        {"id": 2, "title": "Konzert", "date": "2025-12-06", "location": "Peißnitzinsel"},
    ]
    return jsonify(events)

# Beispiel-Route für Health Check
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    # Starte die App im Debug-Modus
    app.run(debug=True)
//new line
