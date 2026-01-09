#!/usr/bin/env python3
"""
Simple test to check if FastAPI works without complex imports
"""

print("Testing basic FastAPI...")

try:
    from fastapi import FastAPI
    print("✓ FastAPI basic import successful")

    # Create a simple app
    app = FastAPI(title="Test API", version="1.0.0")
    print("✓ FastAPI app creation successful")

    @app.get("/")
    def read_root():
        return {"message": "Test API is running"}

    print("✓ Basic app with route created successfully")

except Exception as e:
    print(f"✗ FastAPI test failed: {e}")
    import traceback
    traceback.print_exc()

print("Basic test completed.")