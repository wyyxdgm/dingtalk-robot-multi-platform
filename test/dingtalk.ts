import DingTalkRobot from '../src/index';
import axios from 'axios';

describe('DingTalkRobot', () => {
  const accessToken = 'SEC35e30f505cbdddb035fc00131f8d426aeb2d7f63561be3fc9859e86e9576ffb4';
  let robot: DingTalkRobot;

  beforeEach(() => {
    robot = new DingTalkRobot(accessToken);
  });

  it('should send text message', async () => {
    const text = 'Hello, world!';
    const isAtAll = true;
    const expectedResponse = { data: 'success' };
    const response = await robot.sendText(text, isAtAll);
    expect(response).toEqual(expectedResponse);
  });

  it('should send link message', async () => {
    const linkObject = {
      title: 'Test Title',
      text: 'Test Text',
      picUrl: 'https://agi.damo.plus/files/tools/83789804-a6e6-4291-8f3c-0c0451f585f0.png?timestamp=1745752278&nonce=8eb74f3bfa85c8c0bf0175728dd0dfd3&sign=hd13Ih5P1_9rvM0N_55iufslqwxs6avnMSGZFv07zYI=',
      messageUrl: 'https://agi.damo.plus/chat/RE9TL3olsPoU7pv9'
    };
    const expectedResponse = { data: 'success' };

    (axios.post as jest.Mock).mockResolvedValue(expectedResponse);

    const response = await robot.sendLink(linkObject);

    expect(axios.post).toHaveBeenCalledWith(
      `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`,
      {
        msgtype: 'link',
        link: linkObject
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    expect(response).toEqual(expectedResponse);
  });

  it('should send markdown message', async () => {
    const markdownContent = {
      title: 'Test Title',
      text: '#### Test Text\n'
    };
    const expectedResponse = { data: 'success' };

    (axios.post as jest.Mock).mockResolvedValue(expectedResponse);

    const response = await robot.sendMarkdown(markdownContent);

    expect(axios.post).toHaveBeenCalledWith(
      `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`,
      {
        msgtype: 'markdown',
        markdown: { title: markdownContent.title, text: markdownContent.text }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    expect(response).toEqual(expectedResponse);
  });
});
