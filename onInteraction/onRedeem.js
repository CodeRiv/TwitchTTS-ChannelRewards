const say = require('say');
const async = require('async');

const queueMessage = async.queue(function(message, cb){
    say.speak(message, null, 1, (err) => {
        if (err) {
            return console.error(err);
        }
        cb();
    })
});

module.exports = (channel, context, message, self, rewardID) => {
    if (context["custom-reward-id"] !== rewardID || message.length > 200) return;
    return queueMessage.push(message);

}