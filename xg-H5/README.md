# 星谷创新工程中心 H5 招新页

这是一个可直接部署到 Vercel 的纯前端招新展示和报名页面，基于 Vue 3、Vite、Tailwind CSS 和 Element Plus。

## 数据说明

- `src/data/business.js`：静态业务种子数据，包括专业、技术方向、荣誉、常见问题、配置和演示报名数据。
- `src/api/index.js`：伪接口层，保持原页面调用方式，报名写入 localStorage，刷新后仍保留。
- `src/utils/storage.js`：localStorage 工具，首次访问时从默认静态数据初始化。
- `public/qqcode.jpg`：默认 QQ 群二维码静态资源。

## 运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## Vercel

本目录已包含 `vercel.json`，可作为独立 Vercel 项目部署。
