import requests
import json

# Test the registration endpoint
def test_registration():
    url = "http://127.0.0.1:8000/api/v1/auth/register"

    # Test data for registration
    user_data = {
        "email": "testuser@example.com",
        "password": "testpassword123",
        "full_name": "Test User"
    }

    try:
        response = requests.post(url, json=user_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response
    except Exception as e:
        print(f"Error during registration test: {e}")
        return None

if __name__ == "__main__":
    print("Testing user registration...")
    test_registration()