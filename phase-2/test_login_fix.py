import requests
import json
import time

BASE_URL = "http://localhost:8000/api/v1"

def test_register_new_user():
    print("Testing registration with a new user...")
    # Use a unique email by adding timestamp
    import uuid
    unique_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"

    register_data = {
        "email": unique_email,
        "password": "password123",
        "full_name": "Test User"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
        print(f"Register Status Code: {response.status_code}")
        print(f"Register Response: {response.text}")

        if response.status_code == 200:
            print("✓ Registration successful!")
            return response.json()
        else:
            print(f"✗ Registration failed with status {response.status_code}")
            return None
    except Exception as e:
        print(f"✗ Registration error: {e}")
        return None

def test_login_with_existing_user():
    print("\nTesting login with existing user (test@example.com)...")
    login_data = {
        "email": "test@example.com",
        "password": "password123"
    }

    try:
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"Login Status Code: {response.status_code}")
        print(f"Login Response: {response.text}")

        if response.status_code == 200:
            print("✓ Login successful!")
            return response.json()
        else:
            print(f"✗ Login failed with status {response.status_code}")
            return None
    except Exception as e:
        print(f"✗ Login error: {e}")
        return None

def test_login_with_new_user():
    print("\nTesting login with a new user...")
    # Use a unique email by adding timestamp
    import uuid
    unique_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"

    # First register the new user
    register_data = {
        "email": unique_email,
        "password": "password123",
        "full_name": "Test User"
    }

    try:
        # Register the user first
        register_response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
        print(f"New user registration - Status: {register_response.status_code}, Response: {register_response.text}")

        if register_response.status_code != 200:
            print("Failed to register new user for testing")
            return None

        # Now try to login with the new user
        login_data = {
            "email": unique_email,
            "password": "password123"
        }

        response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        print(f"New user login - Status Code: {response.status_code}")
        print(f"New user login - Response: {response.text}")

        if response.status_code == 200:
            print("✓ New user login successful!")
            return response.json()
        else:
            print(f"✗ New user login failed with status {response.status_code}")
            return None
    except Exception as e:
        print(f"✗ New user login error: {e}")
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
            print("✓ Profile access successful!")
            return response.json()
        else:
            print(f"✗ Profile access failed with status {response.status_code}")
            return None
    except Exception as e:
        print(f"✗ Profile error: {e}")
        return None

if __name__ == "__main__":
    print("Starting authentication tests...\n")

    # Test login with existing user first
    login_result = test_login_with_existing_user()

    if not login_result:
        # If the existing user login failed, try with a new user
        print("\nTrying with a new user...")
        login_result = test_login_with_new_user()

    if login_result and "access_token" in login_result:
        # Finally, try to access the profile with the token
        profile_result = test_profile(login_result["access_token"])

    print("\nAuthentication tests completed.")