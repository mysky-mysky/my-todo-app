import { useState } from "react";

function TodoItem({task, onToggle, onDelete, onEdit}) {
    const [isEditing, setIsEditing] = useState(false);  //声明是否编辑模式(默认否)
    const [editText, setEditText] = useState(task.text);  //声明框里的文字(默认当前)

    const handleSave = () => {  //声明一个'处理保存'功能的(函数式)变量
        if (editText.trim() === '') return;  //如果去掉首尾空格没内容,就退出
        onEdit(task.id, editText);  //告诉父组件onEdit:将当前任务id的文字改为editText
        setIsEditing(false);  //(重新)设置为不可编辑模式
    }

    const handleKeyDown = (e) => {  //声明一个处理键盘事件的(函数式)常量
        if (e.key === 'Enter') {  //如果键是回车
            handleSave();  //就调用保存函数
        }
    }

    return (
        <li className="task-item">
            <input  //一个小方框，可以画对号
                type="checkbox" 
                checked={task.completed}  //跟task的状态保持一致
                onChange={onToggle}  //点击此方框时,执行onToggle函数
            />

            {isEditing ? (  //如果处于编辑模式,就执行:
                <input  //开始输入
                    type='text'  //类型是文字
                    value={editText}  //内容是增加的文字
                    onChange={(e) => setEditText(e.target.value)}  //当改变时,调用setEditText,保存事件的值
                    onBlur={handleSave}  //当失去焦点时(点了框外),调用保存函数
                    onKeyDown={handleKeyDown}  //当键被按下时,调用处理键盘事件函数
                    autoFocus  //自动对焦
                    className="edit-input"  //设置样式的接口
                />
            ) : (  //否则(不是编辑模式),就执行
                <span
                    //下：类名叫数组文本，如果已完成就标记完成，否则就显示空
                    className={`task-text ${task.completed ? 'completed' : ''}`}
                    onDoubleClick={() => setIsEditing(true)}  //双击进入编辑模式
                >
                    {task.text}  {/*分类的任务内容*/}
                </span>
            )}

            <span className="category-badge">
                [{task.category}]  {/*所属的分类*/}
            </span>

            <button onClick={onDelete}>删除</button>
        </li>
    );
}

export default TodoItem
