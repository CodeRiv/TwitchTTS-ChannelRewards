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

module.exports = ({context, message, rewardID, maxLength}) => {
    if (context["custom-reward-id"] !== rewardID || message.length > maxLength) return;
    return queueMessage.push(`${context.username} dice: ${message}`);

}