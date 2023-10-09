from flask import Flask, render_template, request, jsonify
import datetime

app = Flask(__name__)

tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.form.get('task')
    deadline = request.form.get('deadline')

    if task and deadline:
        task_dict = {
            'task': task,
            'deadline': deadline,
        }
        tasks.append(task_dict)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Preencha todos os campos!'})

@app.route('/delete_task', methods=['POST'])
def delete_task():
    task_index = int(request.form.get('index'))
    if 0 <= task_index < len(tasks):
        del tasks[task_index]
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Tarefa não encontrada!'})

if __name__ == '__main__':
    app.run(debug=True)
