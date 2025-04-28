import DingTalkRobot from '../src/index';

const accessToken = 'xxxxxxxxxx'; // 钉钉->聊天群->新增机器人->webhook->获取地址
const robot = new DingTalkRobot(accessToken);

async function sendTextMessage() {
  const text = 'Hello, world!';
  const isAtAll = true;
  try {
    const response = await robot.sendText(text, isAtAll);
    console.log('Text message sent:', response.data); // errcode: 0, errmsg: 'ok'
  } catch (error) {
    console.error('Error sending text message:', error);
  }
}

async function sendLinkMessage() {
  const linkObject = {
    title: 'Test Title',
    text: 'Test Text',
    picUrl: 'https://agi.damo.plus/files/tools/abbd196a-f44c-4b5e-94e7-830b5a9e83c7.png?timestamp=1745753539&nonce=2424a0abe4e741fbd284ad72e7786d68&sign=-sIMKlsYrkLDl2R9hnljtobH0zcrYlOZax8Pk49G6oE=',
    messageUrl: 'https://agi.damo.plus/chat/RE9TL3olsPoU7pv9'
  };
  try {
    const response = await robot.sendLink(linkObject);
    console.log('Link message sent:', response.data); // errcode: 0, errmsg: 'ok'
  } catch (error) {
    console.error('Error sending link message:', error);
  }
}

async function sendMarkdownMessage() {
  const markdownContent = {
    title: 'Test Title',
    text: '#### Test Text\n'
  };
  try {
    const response = await robot.sendMarkdown(markdownContent);
    console.log('Markdown message sent:', response.data);
  } catch (error) {
    console.error('Error sending markdown message:', error);
  }
}

// Uncomment the following lines to run specific tests
// sendTextMessage();
// sendLinkMessage();
// sendMarkdownMessage();
