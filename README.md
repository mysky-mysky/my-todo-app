# React 全栈待办应用

一个功能完整的全栈待办事项管理应用，支持任务的增删改查、分类管理、进度统计。

数据存储在 MongoDB Atlas，前端通过 Axios 调用后端 RESTful API。

## 功能清单

- ✅ 添加任务（支持分类：工作 / 个人 / 学习）
- ✅ 删除任务
- ✅ 编辑任务（双击文字修改）
- ✅ 切换完成状态
- ✅ 按分类筛选（全部 / 工作 / 个人 / 学习）
- ✅ 清除所有已完成任务（带二次确认）
- ✅ 数据持久化（MongoDB 数据库）
- ✅ 进度条可视化
- ✅ 统计数据（总数 / 已完成 / 百分比）

## 技术栈

### 前端
- React 18（函数组件 + Hooks）
- Axios（HTTP 请求）
- 原生 CSS（Flex 布局 + 响应式）

### 后端
- Node.js + Express
- MongoDB + Mongoose
- RESTful API 设计

### 数据库
- MongoDB Atlas（云端存储）

## 项目结构
my-todo-app/ # 前端 React 应用
├── src/
│ ├── App.js # 主组件，管理状态和逻辑
│ ├── App.css # 全局样式
│ ├── TodoInput.js # 输入组件
│ └── TodoItem.js # 任务项组件
└── package.json

todo-backend/ # 后端 Node.js 服务
├── index.js # 入口文件，定义 API 路由
├── models/
│ └── Task.js # 任务数据模型
└── package.json

## 本地运行

### 1. 克隆仓库

```bash
git clone https://github.com/mysky-mysky/my-todo-app.git
cd my-todo-app
2. 安装前端依赖并启动
bash
cd my-todo-app
npm install
npm start
前端默认运行在 http://localhost:3000

3. 安装后端依赖
bash
cd ../todo-backend
npm install
4. 配置环境变量
在 todo-backend 目录下创建 .env 文件：

env
MONGO_URI=你的MongoDB连接字符串
PORT=5000
5. 启动后端服务
bash
npm run dev
后端默认运行在 http://localhost:5000

在线预览
（部署完成后补充链接）

作者
mysky-mysky

许可证
MIT
