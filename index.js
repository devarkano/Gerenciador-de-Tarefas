document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.getElementById('task-input');
        const deadlineInput = document.getElementById('deadline-input');
        
        fetch('/add_task', {
            method: 'POST',
            body: new URLSearchParams({
                task: taskInput.value,
                deadline: deadlineInput.value
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                taskInput.value = '';
                deadlineInput.value = '';
                location.reload();
            } else {
                alert(data.error);
            }
        });
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const index = event.target.getAttribute('data-index');
            
            fetch('/delete_task', {
                method: 'POST',
                body: new URLSearchParams({ index: index }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.error);
                }
            });
        }
    });
});
