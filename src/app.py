from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

@app.route("/")
def index():
    return send_from_directory("../public", "index.html")

@app.route("/events", methods=["GET"])
def get_events():
    events = [
        {"id": 1, "title": "Student Party", "date": "2025-12-05", "location": "Halle Zentrum"},
        {"id": 2, "title": "Konzert", "date": "2025-12-06", "location": "Peißnitzinsel"},
    ]
    return jsonify(events)

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)
