## 待办事项数据流
### 一、添加内容：点击添加后执行的流程

1. todoinput文件
用户输入任务内容到value，选择分类、优先级、截止日期，然后点击“添加”按钮，触发onSubmit={handleSubmit}，handleSubmit里有个onadd把4个值传出去。

2. APP.js文件
里边有TodoInpu组件，onadd属性把4给值扔给addTask函数执行,Add task函数有4个参数（就是刚那4个值），用axios库向API_URL发送post请求（需要把这4个值加进去），这个文件上面定义了API_URL的地址。

3. index文件
app.post通过’/tasks’（在服务器里就是API_URL）接收前端发来的添加数据请求，用body取出4个值，存到task里，执行save方法去将4个之保存到数据库里,await在等候……

4. 数据库
添加数据（代码里不体现）。

5. index文件
Await等到了,用json接收数据库返回的数据task传给res，再通过’/tasks’传给前端的API_URL。

6. app文件
通过function addTask里的then接收到来自API_URL的res，再通过...prev添加到原数组后面。React自动渲染，更新前端显示。

### 二、删除任务：点击删除执行的流程

1. todoitem文件
用户点击删除按钮时，触发onClick={onDelete}，传到app.js的ondelete。

2. app.js文件
app.js里有TodoItem组件，onDelete是个触发函数，找到被选择的id类别task._id，执行函数deleteTask，function deleteTask接受了参数id，用axios库向地址{API_URL}的{id}发送删除请求。

3. index文件
index文件通过'/tasks/:id'接收到删除请求，开始尝试删除：用Task 模型的findByIdAndDelete方法去删除req.params找到的id，await等待结果…

4. 数据库
删除数据（代码里不体现）。

5. index文件
删除成功后，就通过json告诉一下前端对象res删除成功了{message:'删除成功'}，因为没有数据返回，就直接告之即可。

6. app.js文件
如果then成功了，res知道了，就执行修改数组的函数setTasks：拿出旧数组开始过滤，保留不是删除的id的数组。React自动渲染（检测到函数setTasks被调用了，就重新统计，计算，最终进度条对应的数字改变），结束。

### 三、切换完成状态:

1. Todoitem文件
用户点击小方框,触发onChange,执行onToggle函数, 被TodoItem函数当作参数传出去,到App.js文件。

2. App.js文件
TodoItem是App的一个组件,组件内的onToggle,当点击时触发带着task._id执行toggleTask函数, toggleTask函数内在一切顺利的情况下,利用axios库向API_URL的id发送put请求:把完成状态反转一下。

3. index文件
Index文件通过'/tasks/:id'发过来的(要求反转的)请求,利用put开始执行:利用Task
模型的findByIdAndUpdate方法, 将req.params.id 对应的任务，更新为 req.body 中的字段（要求反转）。

4. 数据库
反转状态,不在代码里体现。

5. index文件
(不存在就不说了)如果成功了,就将task转为json,并返回给res。

6. App.js文件
App.js里的toggleTask函数里的then里有res,收到index的返回值后,执行setTasks函数:遍历数组,找到需要反转的id,就把它改为数据库里的res.data. 由于执行了setTasks函数,react自动渲染,浏览器显示反转后的页面，完毕。

### 四、编辑任务:双击任务执行的流程

1. Todoitem文件
如果不是编辑模式，onDoubleClick(双击)时触发setIsEditing进入编辑模式，当用户输入editText,参数onEdit将task._id和 editText回调给父组件，进入App.js文件。

2. App.js文件
App.js文件通过onEdit得知有改变，就执行editTask函数，函数带着newText通过axios库向API_URL的id发送put请求。

3. index文件
Index文件通过'/tasks/:id'获得请求，以task的身份，开始让Task模型带着params.id和body通过findByIdAndUpdate方法，去修改数据库。

4. 数据库
编辑数据,不在代码里体现。

5. index文件
如果task更新了，说明有更改，就转为json再告诉前端res。

6. App.js文件
App.js的函数editTask里，早已经有res在等待，如果then了，就执行setTasks函数：将旧数据遍历，找到对应的id改成新数据。由于执行了setTasks函数,react自动渲染,浏览器显示更新后的页面，完毕。