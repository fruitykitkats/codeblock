// Copyright (c) 2018 FruityKitKats. All rights reserved.

const Discord = require('discord.js');
const ms = require('ms'); // `npm i ms`

// Command Handler 
exports.run = async (client, message, args) => {
    let reminderTime = args[0]; 
    if (!reminderTime) {
        let embed = new Discord.RichEmbed() 
            .setTitle('Proper Usage') 
            .setDescription(`\`<prefix>remindme 15min any text or code\``);
        return message.channel.send(embed); 
    }
    let reminder = args.slice(1).join(" "); 
    let remindEmbed = new Discord.RichEmbed() 
        .setColor('#ffffff')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField('Reminder', `\`\`\`${reminder}\`\`\``) 
        .addField('Time', `\`\`\`${reminderTime}\`\`\``) 
        .setTimestamp();
    message.channel.send(remindEmbed); 
    setTimeout(function() {
        let remindEmbed = new Discord.RichEmbed()
            .setColor('#ffffff')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .addField('Reminder', `\`\`\`${reminder}\`\`\``)
            .setTimestamp();
            return message.channel.send(remindEmbed);
    }, ms(reminderTime));
};
