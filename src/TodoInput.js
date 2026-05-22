import { useState } from "react";

function TodoInput({onAdd}) {  // 定义一个输入函数，接受一个输入按钮
    const [value, setValue] = useState('');  // 凭空创造一个值,用setValue修改

    const handleKeyDown = (e) => {  // 声明一个e键盘
        if (e.key === 'Enter' && value.trim()) {  // 如果为true：按下回车同时去除两端空格后
            onAdd(value);  // 添加value
            setValue('');  // 执行清空事件
        }
    }

    return (
        <div className="input-area">
            <input
                type='text'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={() => {
                if (value.trim()) {
                    onAdd(value);
                    setValue('');
                }
            }}>添加</button>
        </div>
    );
}

export default TodoInput