# 创新工程中心纯前端版

本仓库包含两个 Vite 前端项目：

- `xg-H5`：前台 H5 展示站
- `xg-admin`：后台管理端

项目已改为纯前端静态数据方案，不依赖真实后端接口。默认推荐在 Vercel 从仓库根目录部署，构建后：

- `/` 访问前台 H5
- `/admin/` 访问后台管理端

这样两个端会处于同一个域名下，可以共享浏览器 `localStorage` 中的演示数据。若拆成两个 Vercel 项目部署，因为浏览器同源策略限制，后台和前台的本地数据不会互通。

## 本地运行

```bash
npm run dev:h5
npm run dev:admin
```

也可以分别进入 `xg-H5`、`xg-admin` 目录运行各自的 `npm run dev`。

## Vercel 部署

从仓库根目录导入 Vercel，保持默认构建即可：

- Build Command: `npm run build`
- Output Directory: `dist`

后台演示账号：

- username: `admin`
- password: `admin123`
