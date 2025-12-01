import pytest
from src.app import app

@pytest.fixture
def client():
    app.testing = True
    return app.test_client()

def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json["status"] == "ok"

def test_events(client):
    response = client.get("/events")
    assert response.status_code == 200
    assert isinstance(response.json, list)
