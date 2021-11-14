const tmi = require('tmi.js');
const dotenv = require('dotenv');

const onRedeem = require('./onInteraction/onRedeem');

dotenv.config();

const username = process.env.USERNAME;
const oauthpassword = process.env.OAUTH_PASSWORD;
const channel = process.env.CHANNEL;
const rewardID = process.env.CUSTOM_REWARD_ID;


const myclient = new tmi.Client({
    options: {debug: true},
    connection: {
        reconnect: true,
        secure: true,
    },
    identity: {
        username: username,
        password: oauthpassword,
    },
    channels: [channel],
})

myclient.connect();

myclient.on("message", (channel, context, message, self) => {
    onRedeem(channel, context, message, self, rewardID);
});
