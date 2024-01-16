# dingtalk-robot-multi-platform

基于 nodejs 的跨平台钉钉机器人

## 功能

- 支持通过 API 发消息到钉钉群。
- 支持 GitLab 的 webhook 功能转发消息到钉钉群，参考项目[gitlab-dingtalk](https://github.com/wyyxdgm/gitlab-dingtalk)。

## 使用

1. 安装依赖

```bash
npm install dingtalk-robot-multi-platform -S
```

2. 填写`accessToken`，初始化并发布消息

```js
const accessToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
(async () => {
  const DingtalkRobot = require("dingtalk-robot-multi-platform");
  dingtalkRobot = new DingtalkRobot(accessToken);
  const res = await robot.sendText("hello world");
  console.log(res);
})();
```

## 消息类型

### text 类型

```js
robot.sendText("hello world");
robot.sendText("hello ding talk", true); // 抄送所有人
```

### link 类型

```js
// 发送链接，消息点击后跳转
robot.sendLink({
  text: "hello dingtalk",
  title: "hello wold",
  picUrl: "https://placeholdit.imgix.net/~text?txtsize=14&txt=FreeGroup.org+Cool&w=800&h=600",
  messageUrl: "http://baidu.com",
});
```

### markdown 类型

```js
robot.sendMarkdown({
  title: " 注意了! 注意了!",
  text: `
    > 说点啥呢。。。
   ![必须要截图](http://image.jpg)
   [点击看详情](http://www.taobao.cn/)
  `,
});
```

#### 支持的 markdown 语法

```markdown
标题

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

引用

> A man who stands for nothing will fall for anything.

文字加粗、斜体
**bold**
_italic_

链接
[this is a link](http://name.com)

图片
![](http://name.com/pic.jpg)

无序列表

- item1
- item2

有序列表

1. item1
2. item2
```

### 发布其他消息

- 参考：https://open.dingtalk.com/document/robots/custom-robot-access

#### 原始消息类型

- text 类型

```js
const options = {
  at: {
    atMobiles: ["180xxxxxx"],
    atUserIds: ["user123"],
    isAtAll: false,
  },
  text: {
    content: "我就是我, @XXX 是不一样的烟火",
  },
  msgtype: "text",
};
```

- link 类型

```js
const options = {
  msgtype: "link",
  link: {
    text: "这个即将发布的新版本，创始人xx称它为红树林。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是红树林",
    title: "时代的火车向前开",
    picUrl: "",
    messageUrl:
      "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
  },
};
```

- markdown 类型

```js
const options = {
  msgtype: "markdown",
  markdown: {
    title: "杭州天气",
    text: "#### 杭州天气 @150XXXXXXXX \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n",
  },
  at: {
    atMobiles: ["150XXXXXXXX"],
    atUserIds: ["user123"],
    isAtAll: false,
  },
};
```

- 整体跳转 ActionCard 类型

```js
const options = {
  actionCard: {
    title: "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
    text: `![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png)
 ### 乔布斯 20 年前想打造的苹果咖啡厅
 Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
    btnOrientation: "0",
    singleTitle: "阅读全文",
    singleURL: "https://www.dingtalk.com/",
  },
  msgtype: "actionCard",
};
```

- 独立跳转 ActionCard 类型

```js
const options = {
  msgtype: "actionCard",
  actionCard: {
    title: "我 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
    text: "![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n\n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划",
    btnOrientation: "0",
    btns: [
      {
        title: "内容不错",
        actionURL: "https://www.dingtalk.com/",
      },
      {
        title: "不感兴趣",
        actionURL: "https://www.dingtalk.com/",
      },
    ],
  },
};
```

- FeedCard 类型

```js
const options = {
  msgtype: "feedCard",
  feedCard: {
    links: [
      {
        title: "时代的火车向前开1",
        messageURL: "https://www.dingtalk.com/",
        picURL: "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
      },
      {
        title: "时代的火车向前开2",
        messageURL: "https://www.dingtalk.com/",
        picURL: "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
      },
    ],
  },
};
```

#### 调用

```js
const DingtalkRobot = require("dingtalk-robot-multi-platform");
const options = {...}; // 根据类型生成 options
let robot = new DingTalkRobot("accessToken");
robot.send(options);
```
