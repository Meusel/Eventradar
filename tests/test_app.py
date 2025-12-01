import pytest
from src.app import app

@pytest.fixture
def client():
    # Test-Client für Flask erstellen
    app.testing = True
    return app.test_client()

def test_health(client):
    """Testet den /health Endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json["status"] == "ok"

def test_events(client):
    """Testet den /events Endpoint"""
    response = client.get("/events")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert "title" in data[0]
    assert "date" in data[0]
    assert "location" in data[0]
