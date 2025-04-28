"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const axios_1 = __importDefault(require("axios"));
jest.mock('axios');
describe('DingTalkRobot', () => {
    const accessToken = 'testAccessToken';
    let robot;
    beforeEach(() => {
        robot = new index_1.default(accessToken);
    });
    it('should send text message', async () => {
        const text = 'Hello, world!';
        const isAtAll = true;
        const expectedResponse = { data: 'success' };
        axios_1.default.post.mockResolvedValue(expectedResponse);
        const response = await robot.sendText(text, isAtAll);
        expect(axios_1.default.post).toHaveBeenCalledWith(`https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`, {
            msgtype: 'text',
            text: { content: text },
            at: { isAtAll: isAtAll },
        }, { headers: { 'Content-Type': 'application/json' } });
        expect(response).toEqual(expectedResponse);
    });
    it('should send link message', async () => {
        const linkObject = {
            title: 'Test Title',
            text: 'Test Text',
            picUrl: 'http://example.com/image.png',
            messageUrl: 'http://example.com/link'
        };
        const expectedResponse = { data: 'success' };
        axios_1.default.post.mockResolvedValue(expectedResponse);
        const response = await robot.sendLink(linkObject);
        expect(axios_1.default.post).toHaveBeenCalledWith(`https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`, {
            msgtype: 'link',
            link: linkObject
        }, { headers: { 'Content-Type': 'application/json' } });
        expect(response).toEqual(expectedResponse);
    });
    it('should send markdown message', async () => {
        const markdownContent = {
            title: 'Test Title',
            text: '#### Test Text\n'
        };
        const expectedResponse = { data: 'success' };
        axios_1.default.post.mockResolvedValue(expectedResponse);
        const response = await robot.sendMarkdown(markdownContent);
        expect(axios_1.default.post).toHaveBeenCalledWith(`https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`, {
            msgtype: 'markdown',
            markdown: { title: markdownContent.title, text: markdownContent.text }
        }, { headers: { 'Content-Type': 'application/json' } });
        expect(response).toEqual(expectedResponse);
    });
});
