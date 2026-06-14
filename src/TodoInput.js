import { useState } from "react";

function TodoInput({onAdd}) {  //定义一个输入函数，接受一个回调属性
    const [value, setValue] = useState('');  //凭空创造一个值,用setValue修改
    const [category, setCategory] = useState('工作');

    const handleSubmit = (e) => {  //声明一个'接收一个函数(参数是e)'的变量
        e.preventDefault();  //阻止浏览器的默认行为
        if (value.trim() === '') return;  //如果去除首尾空格后没内容,就退出
        onAdd(value, category);  //(否则)调用父组件数据,将输入的2个参数传出去
        setValue('');  //清空输入框
        setCategory('工作');  //把category重置为工作
    }

    return (
        <form onSubmit={handleSubmit}>  {/*表单容器:点击添加后,执行onSubmit*/}
            <input
                type='text'  //初始化时执行,告诉浏览器:这里输入文本
                placeholder="添加新任务..."  //初始化时执行,占位用的
                onChange={(e) => setValue(e.target.value)}  //触发函数(事件的元素的值)
                value={value}  //开始赋值
            />
            <label htmlFor="categorySelect">分类：</label>  {/*htmlFor用于键盘操作*/}
            <select
                id="categorySelect"
                onChange={(e) => setCategory(e.target.value)} //触发函数(事件的元素的值)
                value={category}  //开始赋值
            >
                <option value="工作">工作</option>
                <option value="个人">个人</option>
                <option value="学习">学习</option>
            </select>

            <button type="submit">添加</button>  {/*submit是执行添加行为*/}
        </form>
    );
}

export default TodoInput;
