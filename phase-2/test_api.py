import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000"

def test_registration():
    """Test user registration"""
    print("Testing user registration...")

    registration_data = {
        "email": "testuser@example.com",
        "full_name": "Test User",
        "password": "testpassword123"
    }

    response = requests.post(f"{BASE_URL}/api/v1/auth/register", json=registration_data)
    print(f"Registration response: {response.status_code}")
    print(f"Registration data: {response.json()}")

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Registration failed: {response.text}")
        return None

def test_login():
    """Test user login"""
    print("\nTesting user login...")

    login_data = {
        "email": "testuser@example.com",
        "password": "testpassword123"
    }

    response = requests.post(f"{BASE_URL}/api/v1/auth/login", json=login_data)
    print(f"Login response: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print(f"Login data keys: {list(data.keys())}")
        return data.get("access_token")
    else:
        print(f"Login failed: {response.text}")
        return None

def test_profile(token):
    """Test getting user profile"""
    print("\nTesting profile access...")

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.get(f"{BASE_URL}/api/v1/auth/profile", headers=headers)
    print(f"Profile response: {response.status_code}")
    print(f"Profile data: {response.json()}")

    return response.status_code == 200

def test_task_crud(token):
    """Test task CRUD operations"""
    print("\nTesting task CRUD operations...")

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # Create a task
    print("Creating a task...")
    task_data = {
        "title": "Test Task",
        "description": "This is a test task",
        "status": "pending",
        "priority": "medium"
    }

    response = requests.post(f"{BASE_URL}/api/v1/tasks/", json=task_data, headers=headers)
    print(f"Create task response: {response.status_code}")

    if response.status_code == 201:
        task = response.json()
        print(f"Created task: {task}")
        task_id = task.get("id")

        # Get the task
        print(f"\nGetting task {task_id}...")
        response = requests.get(f"{BASE_URL}/api/v1/tasks/{task_id}", headers=headers)
        print(f"Get task response: {response.status_code}")
        print(f"Task data: {response.json()}")

        # Update the task
        print(f"\nUpdating task {task_id}...")
        update_data = {
            "title": "Updated Test Task",
            "status": "completed"
        }

        response = requests.put(f"{BASE_URL}/api/v1/tasks/{task_id}", json=update_data, headers=headers)
        print(f"Update task response: {response.status_code}")
        print(f"Updated task: {response.json()}")

        # Mark as complete
        print(f"\nMarking task {task_id} as complete...")
        response = requests.patch(f"{BASE_URL}/api/v1/tasks/{task_id}/complete", headers=headers)
        print(f"Mark complete response: {response.status_code}")
        print(f"Completed task: {response.json()}")

        # Get all tasks
        print("\nGetting all tasks...")
        response = requests.get(f"{BASE_URL}/api/v1/tasks/", headers=headers)
        print(f"Get all tasks response: {response.status_code}")
        print(f"Total tasks: {response.json().get('total', 0)}")

        # Delete the task
        print(f"\nDeleting task {task_id}...")
        response = requests.delete(f"{BASE_URL}/api/v1/tasks/{task_id}", headers=headers)
        print(f"Delete task response: {response.status_code}")

        return True
    else:
        print(f"Failed to create task: {response.text}")
        return False

if __name__ == "__main__":
    print("Starting API tests...\n")

    # Test registration
    user_data = test_registration()

    # Test login
    token = test_login()

    if token:
        print(f"\nReceived token: {token[:20]}...")

        # Test profile
        profile_success = test_profile(token)

        if profile_success:
            print("\nProfile access successful!")

            # Test task CRUD
            task_success = test_task_crud(token)

            if task_success:
                print("\nAll tests passed!")
            else:
                print("\nTask CRUD tests failed!")
        else:
            print("\nProfile access failed!")
    else:
        print("\nLogin failed, cannot proceed with further tests!")