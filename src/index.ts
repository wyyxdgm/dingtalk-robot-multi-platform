import assert from "assert";
import axios, { AxiosResponse } from "axios";

class DingTalkRobot {
  private accessToken: string;

  constructor(accessToken: string) {
    assert(accessToken, "accessToken is necessary!");
    this.accessToken = accessToken;
  }

  /**
   * text 类型
   * text String 必填 文本内容
   * isAtAll 选填 是否抄送所有人
   */
  sendText(text: string = "", isAtAll: boolean = false): Promise<AxiosResponse> {
    return this.send({
      msgtype: "text",
      text: {
        content: text,
      },
      at: {
        isAtAll: isAtAll,
      },
    });
  }

  /**
   * link类型
   * title String 必填 消息标题
   * text String 必填 文本内容
   * picUrl String 否 展示图片
   * messageUrl String 必填 点击消息跳转的URL
   */
  sendLink(linkObject: {
    title: string;
    text: string;
    picUrl?: string;
    messageUrl: string;
  }): Promise<AxiosResponse> {
    return this.send({
      msgtype: "link",
      link: linkObject,
    });
  }

  /**
   * 发布markdown 消息
   * {
   *  "title":"杭州天气",
   *  "text": "#### 杭州天气\n"
   *  }
   * @param markdownContent
   */
  sendMarkdown(markdownContent: { title?: string; text?: string }): Promise<AxiosResponse> {
    const { title = "无题", text = "" } = markdownContent;
    return this.send({
      msgtype: "markdown",
      markdown: {
        title,
        text:`## ${title}
        ---
        ${text}
        `,
      },
    });
  }

  async send(contentBody: any): Promise<AxiosResponse> {
    const url = `https://oapi.dingtalk.com/robot/send?access_token=${this.accessToken}`;
    const headers = { "Content-Type": "application/json" };
    const response = await axios.post(url, contentBody, { headers });
    return response;
  }
}

export default DingTalkRobot;
