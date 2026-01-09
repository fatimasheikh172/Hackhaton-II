#!/usr/bin/env python3
"""
Test script to check if the imports work correctly
"""

print("Testing imports...")

try:
    from fastapi import FastAPI
    print("✓ FastAPI import successful")
except Exception as e:
    print(f"✗ FastAPI import failed: {e}")

try:
    from app.api.v1.tasks.routes import router as tasks_router
    print("✓ Tasks router import successful")
except Exception as e:
    print(f"✗ Tasks router import failed: {e}")

try:
    from app.core.config import settings
    print("✓ Config import successful")
except Exception as e:
    print(f"✗ Config import failed: {e}")

print("Import test completed.")