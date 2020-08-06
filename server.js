import { StreamChat } from 'stream-chat';

// instantiate a client
const serverClient = new StreamChat('KEY', 'SECRET', {});

// create users
const user1 = await serverClient.setUser(
    {
        id: userID,
        name: 'Anders Lund'
    },
    token
);

const user2 = await serverClient.setUser(
    {
        id: userID,
        name: 'Ders Dersington'
    },
    token
);

const user3 = await serverClient.setUser(
    {
        id: userID,
        name: 'John Doe'
    },
    token
);

// add users to channels
const goodChannel = serverClient.channel('team', 'good-channel', {
    members: [user1]
});

const badChannel = serverClient.channel('team', 'bad-channel', {
    members: [user2]
});

// update channel to have a name
const updateChannel = (channel, channelData, message) => {
    channel.update(channelData, message).then(() => {
        console.log('channel updated');
    }).catch((err) => console.error(err))
}

updateChannel(goodChannel, { name: 'goodChannel' }, { text: 'updated channel name' });

// add channel member
const addUsers = (channel, users, message) => {
    channel.addMembers(users, message).then(() => {
        console.log('added member to channel');
    }).catch((err) => console.error(err));
}

addUsers(goodChannel, [user3], { text: 'added user' });

// remove channel member
const removeUsers = (channel, users, message) => {
    channel.removeMembers(users, message).then(() => {
        console.log('removed user from channel');
    }).catch((err) => console.error(err));
}

removeUsers(badChannel, [user2], { text: 'removed user' })

// promote a moderator
const addModerators = (channel, moderators) => {
    channel.addModerators(moderators).then(() => {
        console.log('promoted user to moderator');
    }).catch((err) => console.error(err));
}

addModerators(goodChannel, [user1]);

// ban a user
const banUser = (channel, user, timeout, reason) => {
    channel.banUser(user, { timeout, reason }).then(() => {
        console.log('banned user');
    }).catch((err) => console.error(err));
}

banUser(goodChannel, user3, 60, 'Profanity is not allowed here');