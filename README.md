<h1 align="center">BGmi Frontend</h1>

![demo_img](.github/images/example.png)
![demo_img2](.github/images/example2.png)

## 项目配置

### 安装

```bash
git clone github.com/kahosan/BGmi-frontend.git

cd BGmi-frontend && pnpm install
```

### 部署

**部署前请先将 bgmi 的 `serve_static_files` 设置为 `true` 并执行 `bgmi cal --download-cover`**

有两种可选的部署方式

#### 1. 使用 Next Server

```bash
pnpm build && pnpm start
```

##### 可选配置动画片的静态目录

```nginx
location /bangumi {
  # 默认路径为 ~/.bgmi/bangumi;
  alias /data/bangumi;
}
```

支持 `--port` 指定端口, 会自动代理后端 API, 可在 `next.config.js` 中修改

#### 2. 使用 SSG

```bash
pnpm export && mv dist ~/.bgmi
```

### 配置 SSG

使用 SSG 部署时, 需要配合 NGINX 使用, 配置如下

```nginx
server {
  listen 80;

  autoindex on;
  sendfile on;
  charset utf-8;

  # 动画片存放目录
  location /bangumi {
    # ~/.bgmi/bangumi/
    alias /data/bangumi;
  }

  # BGmi API
  location / {
    proxy_pass http://127.0.0.1:8888/;
  }

  location /_next/ {
    alias /home/user/.bgmi/dist/_next/;
  }

  # LOGO
  location /logo.jpg {
    alias /home/user/.bgmi/dist/logo.jpg;
    try_files /$1 /$1;
  }

  location ~ ^(?:/)?$ {
    alias /home/user/.bgmi/dist/;
    try_files /index.html /index.html;
  }

  location ~ ^/about(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /about.html /index.html;
  }

  location ~ ^/auth(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /auth.html /index.html;
  }

  location ~ ^/calendar(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /calendar.html /index.html;
  }

  location ~ ^/resource(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /resource.html /index.html;
  }

  location ~ ^/subscribe(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /subscribe.html /index.html;
  }

  location ~ ^/player/([^/]+?)(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /player/[bangumi].html /index.html;
  }
}
```

如果你想使用网站的子域名, 按照如下配置

修改 `.env` 中的 `NEXT_PUBLIC_BASE_PATH` 为你的子域名, 然后重新运行 `pnpm export && rm -r ~/.bgmi/dist && mv dist ~/.bgmi`

示例如下

```nginx
# NEXT_PUBLIC_BASE_PATH=/bgmi

server {
  listen 80;

  autoindex on;
  sendfile on;
  charset utf-8;

  location /bgmi/bangumi {
    # ~/.bgmi/bangumi/
    alias /data/bangumi;
  }

  location /bgmi/ {
    proxy_pass http://127.0.0.1:8888/;
  }

  location /bgmi/_next/ {
    alias /home/user/.bgmi/dist/_next/;
  }

  location /bgmi/logo.jpg {
    alias /home/user/.bgmi/dist/logo.jpg;
  }

  location ~ ^/bgmi(?:/)?$ {
    alias /home/user/.bgmi/dist/;
    try_files /index.html /index.html;
  }

  location ~ ^/bgmi/about(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /about.html /index.html;
  }

  location ~ ^/bgmi/auth(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /auth.html /index.html;
  }

  location ~ ^/bgmi/calendar(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /calendar.html /index.html;
  }

  location ~ ^/bgmi/resource(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /resource.html /index.html;
  }

  location ~ ^/bgmi/subscribe(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /subscribe.html /index.html;
  }

  location ~ ^/bgmi/player/([^/]+?)(?:/)?$ {
    alias /home/user/.bgmi/dist;
    try_files /player/[bangumi].html /index.html;
  }
}
```

## 欢迎 PR
