{
    let tasks = [];

    let hideDoneTasks = false;

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done
            },
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindTasksEvenets = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let tasksHTMLString = "";

        for (const task of tasks) {
            tasksHTMLString += `
              <li class="tasks__item
              ${hideDoneTasks && task.done ? " tasks__item--hidden" : ""}">
                <button class="tasks__button tasks__button--done js-done">
                  ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                  ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                  🗑️
                </button>
              </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksHTMLString;
    };

    const renderButtons = () => {
        let buttonsHTMLString = "";

        if (tasks.length > 0) {
            buttonsHTMLString += `
            <span class="section__buttons">
                <button class="section__button js-toggleHideDoneTasksButton">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="section__button js-setAllTasksDoneButton"
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie
                </button>
            </span>`
        };
        document.querySelector(".js-buttons").innerHTML = buttonsHTMLString;
    };

    const bindButtonsEvents = () => {
        const setAllTasksDoneButton = document.querySelector(".js-setAllTasksDoneButton");
        if (setAllTasksDoneButton) {
            setAllTasksDoneButton.addEventListener("click", setAllTasksDone);
        };

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasksButton");
        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const render = () => {
        renderTasks();
        bindTasksEvenets();

        renderButtons();
        bindButtonsEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskItem = document.querySelector(".js-newTask");
        const newTaskContent = newTaskItem.value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);

        newTaskItem.value = "";

        newTaskItem.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};