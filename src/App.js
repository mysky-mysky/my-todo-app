import { useState, useEffect} from 'react';
import './App.css';
import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';

function App() {  //作用:管理所有状态和逻辑,如果没有会直接报错

    // 加载数据:页面初始化,作用:存储所有待办事项,如果没有页面显示空白
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');  //从本地读取数组
        if (saved) {  //如有
            return JSON.parse(saved);  //就转为json
        }
        return [  //如没有,就用下面数组
            {id: 1, text: '学习 React', completed: false, category: '学习'},
            {id: 2, text: '写周报', completed: true, category: '工作'},
            {id: 3, text: '买菜', completed: false, category: '个人'},
        ];
    });

    // 添加输入筛选状态(如果没有,添加时就无法筛选)
    const [filter, setFilter] = useState('全部');

    // 保存数据:监听tasks,自动保存到localstorage.如果没有,刷新页面数据丢失
    useEffect(() => {  // 将数组tasks转为json字符串后,存到本地,名字叫'tasks'
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);  // 当监听到变量tasks变化时, 执行以上函数

    // 添加新任务(如果没有,无法添加新任务)
    function addTask(text, selectedCategory) {
        if (text.trim() === '') return;  //如果输入框是空的,退出函数(不添加)
        const newTask = {  // 创建新任务
            id: Date.now(),  //Data是js的内置对象(当前时间的毫秒数)，直接用
            text: text,
            completed: false,  //刚开始默认未完成
            category: selectedCategory,  //将分类改为外部接受的selectedCategory
        };
        setTasks([...tasks, newTask]);  // 添加到原列表后
    }

    // 定义删除函数,如果没有,就无法删除任务
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));  // 保留...(条件:不匹配的id)
    }

    //清除已完成任务
    function clearCompleted() {
        const hasCompleted = tasks.some(task => task.completed)  //至少有一个已完成
        if (!hasCompleted) {  //如果没有已完成(取反任一已完成,就是一个也没有完成)
            alert('没有已完成的任务');
            return;
        }
        if (window.confirm('确定要删除所有已完成的任务吗?')) {  //(有删除和取消按钮)
            setTasks(tasks.filter(task => !task.completed));  //过滤(保留)未完成的
        }
    }

    // 定义切换完成状态函数,如果没有:已完成和未完成无法来回切换
    function toggleTask(id) {
        setTasks(tasks.map(task =>  //用setTasks修改tasks，执行：用map遍历task
        task.id === id ? {...task, completed: !task.completed} : task
        ));  //如果一样，就将完成的状态task.completed取反，否组不变还是task
    }

    function editTask(id, newText) {  //定义一个编辑任务的函数
        setTasks(tasks.map(task => task.id === id ? {...task, text:newText } : task))
    }  //对数组进行设置:遍历数组,如果是当前id,就将旧的text将替换掉,如果不是就不变


    let filteredTasks = tasks;  //先把原始数组赋值给名叫'筛选后的数组'的变量(默认显示全部分类)
    if (filter !== '全部') {  // 如果不是全部(言外之意：有筛选)
        filteredTasks = tasks.filter(task => task.category === filter);
    }  //就筛选task：保留category是filter的task，赋值给名叫'筛选后的数组'的变量

    // 统计数据(含百分比),如果没有:无法计算完成结果
    const total = filteredTasks.length;
    const completedCount = filteredTasks.filter(t => t.completed).length;  //t可以随意更换
    const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);
    const workCount = tasks.filter(task => task.category === '工作').length;
    const personalCount = tasks.filter(task => task.category ==='个人').length;
    const studyCount = tasks.filter(task => task.category === '学习').length;
    const totalCount = tasks.length;

    return (  //作用:定义界面结构和交互，如果没有,页面显示空白
        <div className="todo-app">
            <h1>待办事项</h1>
            {/*插入TodoInput组件:属性是onAdd函数,将接收的2个参数传递给addTask*/}
            <TodoInput onAdd={(text, category) => addTask(text, category)} /> 

            {tasks.length === 0 ? (  // 如果数组长度是0的话(即没有任何数据)
                <div className="empty-state">暂无任务，添加一条吧</div> //calssName不参与交互
            ) : filteredTasks.length === 0 ? (  //(如有)当前分类任务是0
                <div className="empty-state">暂无{filter}分类任务，添加一条吧</div>
            ) :  (  // 否则,(即有总任务,当前分类也有任务)执行以下内容
                <ul className="task-list">
                    {filteredTasks.map(task => (
                        <TodoItem 
                            key={task.id}  //react强烈建议加上,用来定位到这里
                            task={task}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                            onEdit={editTask}
                        />
                    ))}
                </ul>
            )}

            {/* 添加显示按钮:判断filter是哪个类,如果是工作,就让css显示工作,其他为空,在执行onclick时:
            setFilter触发了重新渲染,在  const[filter, setFilter]=useState('全部')  找到了filter,
            又在  if(filter !== '全部')  找到了该怎么做(即显示工作类别) */}
            <button
                onClick={() => setFilter('全部')}
                className={filter === '全部' ? 'active' : ''}
            >全部({totalCount})</button>
            <button 
                onClick={() => setFilter('工作')}
                className={filter === '工作' ? 'active' : ''} 
            >工作({workCount})</button>
            <button
                onClick={() => setFilter('个人')}
                className={filter === '个人' ? 'active' : ''}
            >个人({personalCount})</button>
            <button
                onClick={() => setFilter('学习')}
                className={filter === '学习' ? 'active' : ''}
            >学习({studyCount})</button>

            <button onClick={clearCompleted} style={{marginLeft:'20px', 
                backgroundColor:'#e74c3c', cloor:'white', border:'none',
                padding:'8px 16px', borderRadius:'8px', cursor:'pointer'}}>
                清除已完成
            </button>

            {/*进度条*/}
            <div className="progress-section">  {/*进度部分*/}
                <div className="progress-bar">  {/*进度条*/}
                    <div className="progress-fill" //进度填充
                    style={{width:`${percentage}%`}}></div> 
                </div>
                <div className="progress-text">完成进度{percentage}</div>
            </div>

            <div className="stats">  {/*上面已经设置好了公式,这里直接用*/}
                总任务:{total} | 已完成:{completedCount} | 进度：{percentage}%
            </div>
        </div>

    );
}
export default App;  //作用:导出组件,如果没有别人无法使用本文件
