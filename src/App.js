import { useState} from 'react';
import './App.css';


function App() {

    const [tasks, setTasks] = useState([
        {id: 1, text:'学习 React', completed: false},
        {id: 2, text:'重写待办应用', completed: false}
    ]);
    const [inputValue, setInputValue] = useState('');

    function addTask() {
        if (inputValue.trim() === '') return;  // 如果输入框是空的,退出函数不添加
        const newTask = {  // 创建新任务
            id: Date.now(),
            text: inputValue,  // 此时已非空
            completed: false,
        };
        setTasks([...tasks, newTask]);  // 添加到原列表后
        setInputValue('');  // 清空输入框,等待下一个输入
    }

    // 定义删除函数
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));  // 保留...(条件:不匹配的id)
    }

    // 定义切换完成状态函数
    function toggleTask(id) {  // 遍历数组:如果相等就改完成状态,否则不变
        setTasks(tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task
        ));
    }

    // 计算统计数据
    const total = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;

    return (
        <div className="todo-app">
            <h1>待办事项</h1>
            <div className="input-area">
                <input
                    type="text"
                    value = {inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="写个新任务" />
                <button onClick={addTask}>添加</button>
            </div>
            <ul className="task-list">
                {tasks.map(task => (
                   <li key={task.id} className="task-item">
                       <input
                           type="checkbox"
                           checked={task.completed}
                           onChange={() => toggleTask(task.id)}
                       />
                       <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                           {task.text}
                       </span>
                       <button onClick={() => deleteTask(task.id)}>删除</button>
                   </li>
                ))}
            </ul>
            <div className="stats">总共:{total} | 已完成:{completedCount}</div>
        </div>

    );
}

export default App;