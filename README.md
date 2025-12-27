# 📝 Phase I: In-Memory Todo CLI Application

This project is the first phase of **Hackathon-II**, demonstrating a robust command-line Todo application. It was built using the **Agentic Dev Stack** (Claude Code + Spec-Kit Plus), following a strict "No Manual Coding" policy.

---

## 🚀 Features

The application provides a full suite of task management capabilities:
* **Add Task:** Create tasks with a mandatory title and optional description.
* **List Tasks:** View all tasks in a beautiful, color-coded table.
* **Update Task:** Modify the title or description of existing tasks by ID.
* **Delete Task:** Remove tasks from the list using their unique ID.
* **Mark Complete:** Toggle the status of tasks between "Pending" and "Completed".

---

## 🛠 Technology Stack

* **Language:** Python 3.13+
* **Package Manager:** [UV](https://github.com/astral-sh/uv)
* **CLI Framework:** [Typer](https://typer.tiangolo.com/)
* **Console UI:** [Rich](https://rich.readthedocs.io/)
* **Development Tools:** Claude Code, Spec-Kit Plus

---

## 📂 Project Structure

```text
├── specs/               # Spec-Kit Plus workflow history
│   ├── sp.specify       # Functional requirements
│   ├── sp.plan          # Development roadmap
│   └── sp.task          # Implementation steps
├── src/                 # Source code
│   ├── models/          # Task data structures
│   ├── repositories/    # In-memory data handling
│   ├── services/        # Task logic & operations
│   └── main.py          # CLI entry point
├── CLAUDE.md            # AI project constitution
├── pyproject.toml       # UV configuration & dependencies
└── README.md            # Project documentation

## Installation & Setup
# Ensure you have the UV package manager installed.

## Clone the Repository:
```
bash

git clone [https://github.com/fatimasheikh172/Hackhaton-II.git](https://github.com/fatimasheikh172/Hackhaton-II.git)
cd Hackhaton-II
Install Dependencies:
```
```
bash

uv sync
```
