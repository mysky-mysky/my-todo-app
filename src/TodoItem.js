function TodoItem({task, onToggle, onDelete}) {
    return (
        <li className="task-item">
            <input type="checkbox" checked={task.completed} onChange={onToggle}/>
            {/* 下：类名叫数组文本，如果已完成就标记完成，否则就显示空 */}
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
            </span>
            <button onClick={onDelete}>删除</button>
        </li>
    );
}

export default TodoItem