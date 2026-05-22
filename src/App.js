import { useState, useEffect} from 'react';
import './App.css';
import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';

// 该周五了
function App() {

    // 加载数据:页面初始化时从local storage读取
    const [tasks, setTasks] = useState ( () => {  //  从usestate中分离出数组和数组执行函数
        const saved = localStorage.getItem('tasks');  // 从本地加载数据tasks赋值给saved
        return saved ? JSON.parse(saved) : [
            {id: 1, text:'学习 React', completed: false},
            {id: 2, text:'重写待办应用', completed: false}
        ];  // 如果有值就变为pares,如果没有就用原数组
    });  

    // 保存数据:tasks变化时,自动保存到localstorage
    useEffect(() => {  // 将名为tasks值为json后的tasks值保存到本地
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);  // 当tasks变化时, 执行以上函数

    function addTask(text) {
        if (text.trim() === '') return;  // 如果输入框是空的,退出函数不添加
        const newTask = {  // 创建新任务
            id: Date.now(),
            text: text,
            completed: false,
        };
        setTasks([...tasks, newTask]);  // 添加到原列表后
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

    // 计算统计数据(含百分比)
    const total = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);

    return (
        <div className="todo-app">
            <h1>待办事项</h1>
            <TodoInput onAdd={(text) => addTask(text)} />
            
            {tasks.length === 0 ? (  // 如果数组长度是0的话
                <div className="empty-state">恭喜，所有任务都完成了</div>
            ) : (  // 否则（执行以下内容）
                <ul className="task-list">
                    {tasks.map(task => (
                        <TodoItem 
                            key={task.id}
                            task={task}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))}
                </ul>
            )}

            <div className="stats">
                总任务:{total} | 已完成:{completedCount} | 进度：{percentage}%
            </div>
        </div>

    );
}

export default App;