# bgmi-typrscript

## Project setup
```
npm install
```
已经设置好了`proxyTable`,当`bgmi_http`运行在默认端口的情况下,在`npm run dev`后不需要再手动设置后端api地址和解决跨域等问题.


## Q&A:

### 我不想给bgmi分配一个域名,想把它放在我网站的一个子目录下怎么办?

nginx.conf
```
server {
  listen 80;
  server_name _;

  root /where/ever;
  autoindex on;
  charset utf-8;

  location /bgmi/bangumi {
    # ~/.bgmi/bangumi
    expires 30d;
    alias /home/ubuntu/.bgmi/bangumi;
  }

  location /bgmi/api {
    proxy_pass http://127.0.0.1:8888;
    # Requests to api/update may take more than 60s
    proxy_connect_timeout 500s;
    proxy_read_timeout 500s;
    proxy_send_timeout 500s;
  }

  location /bgmi/resource {
    proxy_pass http://127.0.0.1:8888;
  }

  location /bgmi/ {
    # ~/.bgmi/front_static/;
    expires 7d;
    alias /home/ubuntu/.bgmi/front_static/;
  }

  location /bgmi/jsonrpc {
    # aria2c rpc
    proxy_pass http://127.0.0.1:6800;
  }
}
```
 thanks to [@wengyusu](https://github.com/wengyusu)

### 我想发一个PR 有什么需要注意的?

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
