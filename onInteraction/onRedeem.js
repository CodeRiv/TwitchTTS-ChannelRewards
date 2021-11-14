const say = require('say');
//Test
module.exports = (channel, context, message, self, rewardID) => {
    console.log(`Mensaje normal: ${message}`);

    if (context["custom-reward-id"] !== rewardID || message.length > 200) return;
    return say.speak(message, 'Sabina', 1);

}