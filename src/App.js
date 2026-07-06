import { useState, useEffect} from 'react';
import axios from 'axios';  //前端调接口
import './App.css';
import TodoItem from './TodoItem.js';
import TodoInput from './TodoInput.js';

const API_URL = 'https://todo-backend-n6z6.onrender.com/tasks';

function App() {  //作用:管理所有状态和逻辑,如果没有会直接报错

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('全部');

    // 加载数据:从后端读取(拿到就存,拿不到报错)
    useEffect(() => {  // 使用副作用(组件渲染后的额外操作)
        axios.get(API_URL)  //axios去后端API_URL获取数据
            .then(res => setTasks(res.data))  //如果成功,就将取到的对象res里的data setTasks成新的tasks
            .catch(err => console.error('加载任务失败:', err))  //如果失败,在控制台显示错误信息
    }, []);  //只在首次加载时执行

    // 添加新任务
    function addTask(text, category) {
        if (text.trim() === '') return;  //如果输入框是空的,退出函数(不添加)
        axios.post(API_URL, {text, category})  //(如有内容)axios库向API_URL添加text和category,服务器会有反应:返回个对象
            .then(res => setTasks(prev => [...prev, res.data]))  //如果返回的是成功对象,将相应对象做数组处理:将旧数组拿出来展开,将新数组追加到后面
            .catch(err => console.error('添加失败', err))  //如果返回的是失败对象,就执行失败对象:显示失败信息
    }

    // 删除任务
    function deleteTask(id) {
        console.log('删除任务，id =', id);
        axios.delete(`${API_URL}/${id}`)  //axios库向后端链接的id发送删除请求,服务器会有反应:返回个对象
            .then(() => setTasks(prev => prev.filter(task => task._id !== id)))  //如果返回的是成功对象,就更新tasks:拿出旧数组,过滤(保留)不等于id的数组
            .catch(err => console.error('删除失败', err))  //如果返回的是失败对象,就显示失败信息
    }

    // 切换完成状态
    function toggleTask(id) {
        const task = tasks.find(t => t._id === id)  //遍历tasks,找到和id一样的t,赋值给task
        if (!task) return;  //如果task没东西(没找到),就退出
        axios.put(`${API_URL}/${id}`, {completed: !task.completed})  //(如果找到了)axios库向那个地址的id发送切换请求,将完成状态反转,服务器会有反应:返回个对象
            .then(res => setTasks(prev => prev.map(t => t._id === id ? res.data : t)))  //如果返回的是成功对象,执行响应对象(更改数组):拿出旧数据遍历,如果是那个id就改为对象的数据,其他不变
            .catch(err => console.error('更新失败', err))  //如果返回的是失败对象,就展示错误信息
        }
    
    //定义编辑文字的函数,接收参数:id和新文字
    function editTask(id, newText) {  
        axios.put(`${API_URL}/${id}`, {text: newText})  //axios库向服务器的API_URL的id发送请求,改为newtext,服务器会有反应:返回个对象
            .then(res => setTasks(prev => prev.map(t => t._id === id ? res.data : t))) //如果返回的是成功对象,就执行set函数:拿出旧数据,遍历每个数据,如果这个数据t的id是要更换的id,就换成返回的对象的数据,否则不变
            .catch(err => (console.error('编辑失败:', err)));  //如果返回的是失败对象,就显示编辑失败,并告之原因
    }

    //清除已完成任务
    function clearCompleted() {
        const completedIds = tasks.filter(t => t.completed).map(t => t._id);  //遍历数组tasks,找出已完成的,再取其id,存到常量completedIds里
        if (completedIds.length === 0) {  //如果已完成的id数量长度为0
            alert('没有已完成的任务');  //弹窗提示:没有已完成的任务
            return;  //紧接着退出(不执行后面的代码)
        };
        if (!window.confirm('确定删除所有已完成的任务吗?')) return;  //如果浏览器弹出"问题",用户点击了否(用!表示),就退出程序(不执行后面的代码)
        const deletePromises = completedIds.map(id => axios.delete(`${API_URL}/${id}`));  //遍历需要删除的id,axios对每个id发送删除请求,将删除请求放到一个常量里
        Promise.all(deletePromises)  //待deletePromises全部完成
            .then(() => setTasks(prev => prev.filter(t => !t.completed)))  //如果删除请求都成功,就调用setTasks更新任务列表:拿出旧列表,筛选出没有完成的项
            .catch(err => console.error('批量删除失败:',err));  //如果删除请求失败接收错误对象,就在控制台显示错误信息,并告知原因
    }

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
            <TodoInput onAdd={addTask} /> 

            {tasks.length === 0 ? (  // 如果数组长度是0的话(即没有任何数据)
                <div className="empty-state">暂无任务，添加一条吧</div> //calssName不参与交互
            ) : filteredTasks.length === 0 ? (  //(如有)当前分类任务是0
                <div className="empty-state">暂无{filter}分类任务，添加一条吧</div>
            ) :  (  // 否则,(即有总任务,当前分类也有任务)执行以下内容
                <ul className="task-list">
                    {filteredTasks.map(task => (
                        <TodoItem 
                            key={task._id}  //react强烈建议加上,用来定位到这里
                            task={task}
                            onToggle={() => toggleTask(task._id)}
                            onDelete={() => deleteTask(task._id)}
                            onEdit={editTask}
                        />
                    ))}
                </ul>
            )}

            {/* 添加显示按钮:判断filter是哪个类,如果是工作,就让css显示工作,其他为空,在执行onclick时:
            setFilter触发了重新渲染,在  const[filter, setFilter]=useState('全部')  找到了filter,
            又在  if(filter !== '全部')  找到了该怎么做(即显示工作类别) */}
            
            <div className='filter-buttons'>
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
            </div>


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
