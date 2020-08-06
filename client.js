import { StreamChat } from 'stream-chat';

// instantiate a client
const client = new StreamChat('KEY');

// fetch a channel list
const getChannels = (filter, sort, options) => {
    client.queryChannels(filter, sort, options).then((results) => {
        return results;
    }).catch((err) => console.error(err));
};

const channels = getChannels(
    { type: 'messaging', members: { $in: ['thierry'] } },
    { last_message_at: -1 },
    { watch: true, state: true }
);

// send a message
const sendMessage = (channel, message) => {
    channel.sendMessage(message).then(() => {
        console.log('message sent');
    }).catch((err) => console.error(err));
};

// edit a message
const updateMessage = (message) => {
    client.updateMessage(message).then(() => {
        console.log('message updated');
    }).catch((err) => console.error(err));
};

// flag a message
const flagMessage = (messageID) => {
    client.flagMessage(messageID).then(() => {
        console.log('flagged message');
    }).catch((err) => console.error(err));
};

// add reaction to message
const addReaction = (channel, messageID, options) => {
    channel.sendReaction(messageID, options).then(() => {
        console.log('added reaction');
    }).catch((err) => console.error(err));
};