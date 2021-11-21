const tmi = require('tmi.js');
const dotenv = require('dotenv');

const onRedeem = require('./onInteraction/onRedeem');

dotenv.config();

//Carga la configuración y lo asigna a las variables
const username = process.env.USERNAME;
const oauthpassword = process.env.OAUTH_PASSWORD;
const channel = process.env.CHANNEL;
const rewardID = process.env.CUSTOM_REWARD_ID;
const maxLength = process.env.MAX_LENGTH | 200;

//Inicializa el cliente TMI
const myclient = new tmi.Client({
    options: { debug: true },
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
//Evento que se dispara al recibir mensaje nuevo
myclient.on("message", (channel, context, message, self) => {
    onRedeem({
        context: context,
        message: message, 
        rewardID: rewardID,
        maxLength: maxLength});
});
