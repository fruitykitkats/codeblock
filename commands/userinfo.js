// Copyright (c) 2018 FruityKitKats. All rights reserved.

const Discord = require('discord.js'); 
const moment = require('moment'); // `npm i moment`

// Command Handler
exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed() 
        .setColor('RANDOM') 
        .setThumbnail(user.avatarURL)
        .setTitle(`${user.username}#${user.discriminator}`)
        .addField('ID:', `${user.id}`, true)
        .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField('Created at:', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Joined server:', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', `${user.presence.status}`, true)
        .addField('Game:', `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField('Roles:', member.roles.map(roles => `${roles.name}`).join(', '), true)
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
    return message.channel.send({embed});
};
