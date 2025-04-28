import { AxiosResponse } from "axios";
declare class DingTalkRobot {
    private accessToken;
    constructor(accessToken: string);
    /**
     * text 类型
     * text String 必填 文本内容
     * isAtAll 选填 是否抄送所有人
     */
    sendText(text?: string, isAtAll?: boolean): Promise<AxiosResponse>;
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
    }): Promise<AxiosResponse>;
    /**
     * 发布markdown 消息
     * {
     *  "title":"杭州天气",
     *  "text": "#### 杭州天气\n"
     *  }
     * @param markdownContent
     */
    sendMarkdown(markdownContent: {
        title?: string;
        text?: string;
    }): Promise<AxiosResponse>;
    send(contentBody: any): Promise<AxiosResponse>;
}
export default DingTalkRobot;
