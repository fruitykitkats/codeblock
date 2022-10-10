const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

const prefix = process.env.PREFIX; 
const ownerID = process.env.OWNER; 

// serverStats info
const serverStats = {
    guildID: 'guildID',
    totalUsersID: 'channelID',
    memberCountID: 'channelID',
    botCountID: 'channelID'
}; 

// Statuses
let statuses = ['Codeblock', 'Development', 'In Development!', 'Node.js'];

client.on('ready', () => { 

    // Setting the interval
    setInterval(function() {

        // Fetch random item in the array
        let status = statuses[Math.floor(Math.random()*statuses.length)];
        
        // Only chose the one you are using
        // Stable:
        client.user.setPresence({ game: { name: status }, status: 'online' });

        // Master:
        client.user.setPresence({ activity: { name: status }, status: 'online' }); 

    }, 100000) // This runs the interval every 100000ms, or 100 seconds. 

})

client.on('message', message => {

    // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Return Statements
    if (message.author.bot) return; 
    if (!message.content.startsWith(prefix)) return; 

    // Command Handler
    try {

        // Auto-Reload
        delete require.cache[require.resolve(`./commands/${cmd}.js`)]; 
        
        let ops = {
            ownerID: ownerID
        }

        let commandFile = require(`./commands/${cmd}.js`); 
        commandFile.run(client, message, args, ops); 

    } catch (e) { 
        console.log(e.stack);
    }

});

client.on('ready', () => console.log('Bot Launched!'));

client.on('guildMemberAdd', member => {

    if (member.guild.id !== serverStats.guildID) return;

    // Member joins guild
    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});

client.on('guildMemberRemove', member => {

    if (member.guild.id !== serverStats.guildID) return;

    // Member leaves guild
    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

}); 

// Login 
client.login(process.env.TOKEN); 
