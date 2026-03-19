# 欧姆龙PLC 轴运动控制功能块封装参数手册

> Omron NJ/NX Series — IEC 61131-3 PLCopen Motion Control Function Block Parameter Reference

## 项目简介

本项目是一个基于 **Vue.js 2** 的 Web 应用，用于展示和查询 **欧姆龙 NJ/NX 系列 PLC** 中符合 **IEC 61131-3 PLCopen** 标准的轴运动控制功能块的详细参数说明。

### 主要功能

- 📋 **功能块参数速查**：左侧侧边栏列出全部功能块，点击即可在右侧查看详细参数表格
- 📥 **输入参数说明**：参数名、数据类型、描述、默认值、有效范围
- 📤 **输出参数说明**：参数名、数据类型、描述
- 📝 **使用注意事项**：每个功能块附有中文使用说明

### 已封装功能块列表

| 功能块 | 中文名 | 说明 |
|--------|--------|------|
| MC_Power | 轴使能 | 使能或禁止轴的运动控制 |
| MC_Home | 回原点 | 执行轴的回原点操作 |
| MC_MoveAbsolute | 绝对位置运动 | 移动到指定绝对位置 |
| MC_MoveRelative | 相对位置运动 | 从当前位置移动指定距离 |
| MC_MoveVelocity | 速度运动 | 以指定速度持续运动 |
| MC_MoveAdditive | 叠加运动 | 在当前目标基础上叠加运动距离 |
| MC_Stop | 停止运动 | 平滑减速停止并锁定轴 |
| MC_Halt | 暂停运动 | 平滑减速停止（可继续发指令）|
| MC_Reset | 错误复位 | 复位轴的错误状态 |
| MC_ReadActualPosition | 读取实际位置 | 连续读取轴的编码器位置 |
| MC_ReadActualVelocity | 读取实际速度 | 连续读取轴的当前速度 |
| MC_ReadStatus | 读取轴状态 | 读取 PLCopen 轴状态机各状态 |
| MC_ReadAxisError | 读取轴错误 | 读取轴的错误代码 |
| MC_SetPosition | 设置位置 | 重设轴坐标值（不产生运动）|
| MC_SetOverride | 速度倍率覆盖 | 实时修改速度/加减速倍率 |

### 技术栈

- **前端框架**：Vue.js 2
- **路由**：vue-router 3
- **构建工具**：webpack 3

## 🌐 在线访问（无需安装）

本项目通过 GitHub Actions 自动构建并部署到 GitHub Pages。

👉 **https://albertzfg.github.io/parameter/#/omron-axis**

> **如果链接打不开**，说明仓库还未启用 GitHub Pages，请仓库管理员按以下步骤一次性开启：
>
> 1. 打开仓库页面 → 点击顶部 **Settings（设置）**
> 2. 左侧菜单找到 **Pages**
> 3. **Source（来源）** 下拉框选择 **Deploy from a branch**
> 4. **Branch** 选择 **`gh-pages`** → 目录选 **`/ (root)`**
> 5. 点击 **Save**，等待约 1-2 分钟后刷新即可访问

---

## 💻 本地运行（开发模式）

### 前提条件

在运行本项目之前，请确保已安装：

| 软件 | 版本要求 | 下载地址 |
|------|----------|----------|
| **Node.js** | **6.0 – 16.x（`npm run dev` 开发服务器）/ 任意版本（`npm run build`）** | https://nodejs.org/ |
| **npm** | ≥ 3.0 （随 Node.js 一起安装） | — |

> ⚠️ **注意**：`npm run dev`（开发服务器）仅兼容 **Node.js ≤ 16**。
> 如果你使用的是 Node.js 18 或更高版本，请参考下方"[使用构建产物运行](#-使用构建产物运行nodejs--16-均可)"章节。

安装完成后，在终端执行以下命令验证：

```bash
node -v   # 应显示 v16.x.x 或更低（如 v14.x.x 也可）
npm -v    # 应显示 3.x.x 或更高
```

### 步骤一：克隆或下载项目

```bash
git clone https://github.com/albertzfg/parameter.git
cd parameter
```

或者直接在 GitHub 页面点击 **Code → Download ZIP**，解压后进入项目目录。

### 步骤二：安装依赖

```bash
npm install
```

> 首次运行需要联网下载依赖包，约需 1-3 分钟，请耐心等待。

### 步骤三：启动开发服务器

```bash
npm run dev
# 或等价命令：
npm start
```

启动成功后，终端会显示类似以下内容：

```
 DONE  Compiled successfully in 3000ms

 I  Your application is running here: http://localhost:8080
```

### 步骤四：用浏览器打开

在浏览器地址栏输入并访问：

```
http://localhost:8080/#/omron-axis
```

即可看到欧姆龙PLC 轴运动控制功能块参数手册页面。

> **停止服务器**：在终端按 `Ctrl + C`

---

## 🚀 使用构建产物运行（Node.js ≥ 16 均可）

如果你使用 Node.js 18 及以上版本，`npm run dev` 会报错。可以改用以下方式：先构建，再用任意静态文件服务器预览。

```bash
# 1. 安装依赖
npm install

# 2. 构建（所有 Node 版本均兼容）
npm run build

# 3. 全局安装一个简单的静态服务器（只需安装一次）
npm install -g serve

# 4. 在 dist 目录启动服务（-s 保证 SPA 路由刷新不 404）
serve -s dist

# 或者使用 npx（无需全局安装）
npx serve -s dist
```

启动后，终端显示的地址（通常是 `http://localhost:3000`）即为访问地址，在地址后加上 `/#/omron-axis` 即可。

---

## 🔧 常见问题

**Q: 执行 `npm install` 时报错 / 速度很慢**

将 npm 镜像切换为国内源（淘宝镜像）：

```bash
npm config set registry https://registry.npmmirror.com
npm install
```

**Q: 端口 8080 已被占用**

```bash
# 指定其他端口（例如 8888）
PORT=8888 npm run dev
```

然后访问 `http://localhost:8888/#/omron-axis`

**Q: `npm run dev` 报错 `No such module: http_parser`**

你的 Node.js 版本过高（≥ 18），开发服务器不兼容。请：
- 安装 Node.js v16 LTS（推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理多版本）
- 或改用上方"使用构建产物运行"的方式

**Q: 浏览器打开后页面空白**

请确认地址栏包含 `#/omron-axis` 路径。

---

## 📦 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可部署到任意静态文件服务器。
