# bgmi-frontend

基于Vue2.x

```
# clone
git clone git@github.com:BGmi/BGmi-frontend.git
cd BGmi-frontend
# install dependences
npm i
# develop
npm run dev
# build
npm run dist
```
已经设置好了`proxyTable`,当`bgmi_http`运行在默认端口的情况下,在`npm run dev`后不需要再手动设置后端api地址和解决跨域等问题.



## Q&A:

### 我不想给bgmi分配一个域名,想把它放在我网站的一个子目录下怎么办?

不知道子目录具体是什么的情况下设置起来非常的麻烦,想要把所有的绝对路径改成相对路径不是简单的修改一两个设置就能解决的问题,但是如果知道子目录名的话就非常简单,只需要简单的修改一个设置..

所以如果你有这样的需求的话,请自己编译自己的前端.(不需要修改具体的代码,只需要修改一行配置)

安装`nodejs`和`npm`修改 [config/index.js#L29](https://github.com/Trim21/BGmi-frontend/blob/master/config/index.js#L29)中的`assetsPublicPath`为你想要的字目录,比如`/bgmi/`,然后运行


修改`api`请求的目录:

修改`nain.js`中的`Vue.http.options.root`
```
Vue.http.options.root = '/api/'-> /api/index
Vue.http.options.root = '/bgmi/api/' -> /bgmi/api/index
```

```
git clone git@github.com:BGmi/BGmi-frontend.git
cd BGmi-frontend
vim config/index.js +29
npm i
npm run build
```
`dist`文件夹里就是编译好的前端文件
如果你愿意帮忙配置的话请给我发一个pr,我很乐意merge

node 8.x.x
npm 5.x.x

### 我想发一个PR 有什么需要注意的?

PR到[BGmi/BGmi-frontend](https://github.com/BGmi/BGmi-frontend)

其他的..暂时没有
