import DingTalkRobot from '../src/index';

const accessToken = 'SEC35e30f505cbdddb035fc00131f8d426aeb2d7f63561be3fc9859e86e9576ffb4';
const robot = new DingTalkRobot(accessToken);

async function sendTextMessage() {
  const text = 'Hello, world!';
  const isAtAll = true;
  try {
    const response = await robot.sendText(text, isAtAll);
    console.log('Text message sent:', response.data);
  } catch (error) {
    console.error('Error sending text message:', error);
  }
}

async function sendLinkMessage() {
  const linkObject = {
    title: 'Test Title',
    text: 'Test Text',
    picUrl: 'https://agi.damo.plus/files/tools/83789804-a6e6-4291-8f3c-0c0451f585f0.png?timestamp=1745752278&nonce=8eb74f3bfa85c8c0bf0175728dd0dfd3&sign=hd13Ih5P1_9rvM0N_55iufslqwxs6avnMSGZFv07zYI=',
    messageUrl: 'https://agi.damo.plus/chat/RE9TL3olsPoU7pv9'
  };
  try {
    const response = await robot.sendLink(linkObject);
    console.log('Link message sent:', response.data);
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
