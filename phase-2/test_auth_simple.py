import requests
import json

BASE_URL = "http://localhost:8005/api/v1"

def test_register():
    print("Testing registration...")
    register_data = {
        "email": "test@example.com",
        "password": "password123",
        "full_name": "Test User"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
        print(f"Register Status Code: {response.status_code}")
        print(f"Register Response: {response.text}")

        if response.status_code == 200:
            print("[SUCCESS] Registration successful!")
            return response.json()
        else:
            print(f"[ERROR] Registration failed with status {response.status_code}")
            # Let's also try to see if the user already exists and try with a different email
            if response.status_code == 400:
                print("Trying with a different email...")
                register_data["email"] = "test2@example.com"
                response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
                print(f"Register Status Code (2nd try): {response.status_code}")
                print(f"Register Response (2nd try): {response.text}")

                if response.status_code == 200:
                    print("[SUCCESS] Registration successful with 2nd try!")
                    return response.json()
            return None
    except Exception as e:
        print(f"[ERROR] Registration error: {e}")
        return None

def test_login():
    print("\nTesting login...")
    login_data = {
        "email": "test@example.com",
        "password": "password123"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"Login Status Code: {response.status_code}")
        print(f"Login Response: {response.text}")

        if response.status_code == 200:
            print("[SUCCESS] Login successful!")
            return response.json()
        else:
            print(f"[ERROR] Login failed with status {response.status_code}")
            return None
    except Exception as e:
        print(f"[ERROR] Login error: {e}")
        return None

def test_profile(token):
    print("\nTesting profile access...")
    headers = {
        "Authorization": f"Bearer {token}"
    }

    try:
        response = requests.get(f"{BASE_URL}/auth/profile", headers=headers)
        print(f"Profile Status Code: {response.status_code}")
        print(f"Profile Response: {response.text}")

        if response.status_code == 200:
            print("[SUCCESS] Profile access successful!")
            return response.json()
        else:
            print(f"[ERROR] Profile access failed with status {response.status_code}")
            return None
    except Exception as e:
        print(f"[ERROR] Profile error: {e}")
        return None

if __name__ == "__main__":
    print("Starting authentication tests...\n")

    # First, try to register a new user
    register_result = test_register()

    # Then, try to login with that user
    login_result = test_login()

    if login_result and "access_token" in login_result:
        # Finally, try to access the profile with the token
        profile_result = test_profile(login_result["access_token"])

    print("\nAuthentication tests completed.")