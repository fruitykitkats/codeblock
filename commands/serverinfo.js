const Discord = require('discord.js');

// Command Handler 
exports.run = async (client, message, args) => {

    // Variables
    let icon = message.guild.iconURL;
    let embed = new Discord.RichEmbed() 
        .setDescription('Server Info')
        .setColor('RANDOM')
        .setThumbnail(icon)
        .addField('Server Name', message.guild.name)
        .addField('Created on', message.guild.createdAt)
        .addField('You joined', message.member.joinedAt)
        .addField('Total Members', message.guild.memberCount);

    // Send embed
    message.channel.send(embed);

} 