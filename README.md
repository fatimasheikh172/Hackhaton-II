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

----

```
uv run python -m src.cli.main
