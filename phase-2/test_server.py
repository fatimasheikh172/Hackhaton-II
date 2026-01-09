import requests
import time
import subprocess
import signal
import os

def test_server():
    try:
        # Try to make a request to the server
        response = requests.get("http://127.0.0.1:8000/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Server is running! Response: {data}")
            return True
        else:
            print(f"✗ Server responded with status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to server - server might not be running")
        return False
    except requests.exceptions.Timeout:
        print("✗ Request timed out - server might be slow to respond")
        return False
    except Exception as e:
        print(f"✗ Error testing server: {e}")
        return False

if __name__ == "__main__":
    print("Testing if the server is running...")
    test_server()