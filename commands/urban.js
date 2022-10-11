// Copyright (c) 2018 FruityKitKats. All rights reserved.

const urban = require('relevant-urban'); // `npm i relevant-urban`
const Discord = require('discord.js'); 

exports.run = async (client, message, args, tools) => {
    if (!args[0]) return message.channel.send(`***Please specify some text!***`);
    let res = await urban(args.join(' ')).catch(e => {
        return message.channel.send('***Sorry, that word was not found!***');
    });
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM') 
        .setTitle(res.word) 
        .setURL(res.urbanURL) 
        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
        .addField('Author', res.author, true) 
        .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`);
    if (res.tags.length > 0 && res.tags.join(', ').length < 1024) {
        embed.addField('Tags', res.tags.join(', '), true);
    }
    return message.channel.send(embed); 
};
