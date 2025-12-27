import typer
import re
from typing import Optional
from rich.console import Console
from rich.table import Table
from datetime import datetime

from src.models.task import Task
from src.repositories.memory_repo import InMemoryRepository
from src.services.todo_service import TodoService

# Create a Typer app
app = typer.Typer()
console = Console()

# Initialize the service with repository
repository = InMemoryRepository()
service = TodoService(repository)


def print_welcome() -> None:
    """
    Print a welcome message for the interactive CLI.
    """
    console.print("[bold blue]Welcome to the Todo Console App![/bold blue]")
    console.print("Type 'help' for available commands or 'exit' to quit.\n")


def print_help() -> None:
    """
    Print help information for available commands.
    """
    console.print("\n[bold]Available Commands:[/bold]")
    console.print("  add \"[title]\" --desc \"[description]\"    Add a new task")
    console.print("  list                                   List all tasks")
    console.print("  complete [id]                          Mark task as complete")
    console.print("  update [id] --title \"[new_title]\"      Update task title")
    console.print("  update [id] --desc \"[new_description]\" Update task description")
    console.print("  delete [id]                            Delete a task")
    console.print("  help                                   Show this help message")
    console.print("  exit or quit                           Exit the application\n")


def parse_command(user_input: str) -> tuple:
    """
    Parse the user input command and return the command and arguments.

    Args:
        user_input: The raw user input string

    Returns:
        A tuple containing the command and a list of arguments
    """
    user_input = user_input.strip()
    if not user_input:
        return "", []

    # Split the command and arguments, respecting quoted strings
    parts = re.findall(r'(?:[^\s"]+|"[^"]*")+', user_input)
    command = parts[0].lower() if parts else ""
    args = parts[1:] if len(parts) > 1 else []

    # Process arguments to remove quotes
    processed_args = []
    for arg in args:
        if arg.startswith('"') and arg.endswith('"'):
            arg = arg[1:-1]  # Remove surrounding quotes
        processed_args.append(arg)

    return command, processed_args


def handle_add_command(args: list) -> None:
    """
    Handle the add command.

    Args:
        args: List of arguments provided with the command
    """
    if len(args) < 1:
        console.print("[red]Error: Please provide a title for the task.[/red]")
        return

    title = args[0]
    description = None

    # Check for --desc flag
    i = 1
    while i < len(args):
        if args[i] == "--desc" and i + 1 < len(args):
            description = args[i + 1]
            i += 2
        else:
            i += 1

    try:
        task = service.add_task(title, description)
        console.print(f"[green]Task created with ID: {task.id}[/green]")
    except ValueError as e:
        console.print(f"[red]Error: {str(e)}[/red]")


def handle_list_command() -> None:
    """
    Handle the list command.
    """
    tasks = service.list_tasks()

    if not tasks:
        console.print("[yellow]No tasks found.[/yellow]")
        return

    table = Table(title="Your Tasks")
    table.add_column("ID", style="dim")
    table.add_column("Title", style="bold")
    table.add_column("Description")
    table.add_column("Status")
    table.add_column("Created At")

    for task in tasks:
        status_color = "green" if task.status == "Completed" else "red"
        table.add_row(
            str(task.id),
            task.title,
            task.description or "",
            f"[{status_color}]{task.status}[/{status_color}]",
            task.created_at.strftime("%Y-%m-%d %H:%M")
        )

    console.print(table)


def handle_complete_command(args: list) -> None:
    """
    Handle the complete command.

    Args:
        args: List of arguments provided with the command
    """
    if len(args) < 1:
        console.print("[red]Error: Please provide a task ID.[/red]")
        return

    try:
        task_id = int(args[0])
        task = service.complete_task(task_id)

        if task:
            console.print(f"[green]Task {task_id} marked as completed.[/green]")
        else:
            console.print(f"[red]Error: Task with ID {task_id} not found.[/red]")
    except ValueError:
        console.print("[red]Error: Task ID must be a number.[/red]")


def handle_update_command(args: list) -> None:
    """
    Handle the update command.

    Args:
        args: List of arguments provided with the command
    """
    if len(args) < 2:
        console.print("[red]Error: Please provide a task ID and at least one update parameter.[/red]")
        return

    try:
        task_id = int(args[0])

        title = None
        description = None

        # Parse the update parameters
        i = 1
        while i < len(args):
            if args[i] == "--title" and i + 1 < len(args):
                title = args[i + 1]
                i += 2
            elif args[i] == "--desc" and i + 1 < len(args):
                description = args[i + 1]
                i += 2
            else:
                console.print(f"[red]Error: Unknown parameter '{args[i]}'. Use --title or --desc.[/red]")
                return

        task = service.update_task(task_id, title, description)

        if task:
            console.print(f"[green]Task {task_id} updated successfully.[/green]")
        else:
            console.print(f"[red]Error: Task with ID {task_id} not found.[/red]")
    except ValueError:
        console.print("[red]Error: Task ID must be a number.[/red]")


def handle_delete_command(args: list) -> None:
    """
    Handle the delete command.

    Args:
        args: List of arguments provided with the command
    """
    if len(args) < 1:
        console.print("[red]Error: Please provide a task ID.[/red]")
        return

    try:
        task_id = int(args[0])
        success = service.delete_task(task_id)

        if success:
            console.print(f"[green]Task {task_id} deleted successfully.[/green]")
        else:
            console.print(f"[red]Error: Task with ID {task_id} not found.[/red]")
    except ValueError:
        console.print("[red]Error: Task ID must be a number.[/red]")


def main_loop() -> None:
    """
    Main interactive loop for the CLI application.
    """
    print_welcome()

    while True:
        try:
            user_input = console.input("[bold cyan]todo-app> [/bold cyan]")
            command, args = parse_command(user_input)

            if command in ["exit", "quit"]:
                console.print("[bold blue]Goodbye![/bold blue]")
                break
            elif command == "help":
                print_help()
            elif command == "add":
                handle_add_command(args)
            elif command == "list":
                handle_list_command()
            elif command == "complete":
                handle_complete_command(args)
            elif command == "update":
                handle_update_command(args)
            elif command == "delete":
                handle_delete_command(args)
            elif command == "":
                # Empty command, just continue
                continue
            else:
                console.print(f"[red]Unknown command: {command}. Type 'help' for available commands.[/red]")

        except KeyboardInterrupt:
            console.print("\n[bold blue]Goodbye![/bold blue]")
            break
        except EOFError:
            console.print("\n[bold blue]Goodbye![/bold blue]")
            break


if __name__ == "__main__":
    main_loop()