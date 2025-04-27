"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const axios_1 = __importDefault(require("axios"));
class DingTalkRobot {
    constructor(accessToken) {
        (0, assert_1.default)(accessToken, "accessToken is necessary!");
        this.accessToken = accessToken;
    }
    /**
     * text 类型
     * text String 必填 文本内容
     * isAtAll 选填 是否抄送所有人
     */
    sendText(text = "", isAtAll = false) {
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
    sendLink(linkObject) {
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
    sendMarkdown(markdownContent) {
        const { title = "无题", text = "" } = markdownContent;
        return this.send({
            msgtype: "markdown",
            markdown: {
                title,
                text,
            },
        });
    }
    send(contentBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://oapi.dingtalk.com/robot/send?access_token=${this.accessToken}`;
            const headers = { "Content-Type": "application/json" };
            const response = yield axios_1.default.post(url, contentBody, { headers });
            return response;
        });
    }
}
exports.default = DingTalkRobot;
