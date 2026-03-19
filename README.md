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

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（localhost:8080）
npm run dev

# 生产构建
npm run build
```

启动后访问：
- `http://localhost:8080/` — 首页
- `http://localhost:8080/#/omron-axis` — 欧姆龙PLC 轴运动控制功能块参数手册
