// TODO:
// only admins allowed to work with cron jobs
// !commands should describe commands. Store this in the cmdList array.
// Which channel does the bot type to?

// Someone wrote this library to use the discord api.
const Discord = require('discord.js');
const client = new Discord.Client();

/* external modules */


/* local files */
const config = require('./config.json'); // contains prefix and token
const cmdFunc = require('./cmdFunc.js'); // contains all the functions called in core switch statement

const pre = config.prefix;

// Prints "I am ready" when the bot is on
client.on('ready', () => {
    console.log('I am ready!');
});

// An array of all the commands.
// Adding another layer is useful to have more descriptive/longer variable names,
// but still have a short command for the user.
// This is also used to list all the commands to the user.
let cmdList = {
    commandList: "commands",
    createCron: "createCronJob",
    startCron: "startCronJob",
    stopCron: "stopCronJob"
};

// Watches the messages in chat
client.on('message', (msgObj) => {
    // prevents wasting bot resources on messages that don't have the prefix, or on other bots
    if (msgObj.content.indexOf(config.prefix) !== 0 || msgObj.author.bot)
        return;

    // Stores the commands/arguments in easily accessible variables
    const args = msgObj.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    // Helper function to verify the number of arguments in the user's input was correct.
    args.validateArgs = function(count){
        if (this.length == count)
            return true;
        else
            return false;
    }

    switch (command){
        case 'ping': // Example response
            msgObj.reply('pong');
            break;

        case cmdList.commandList:
            cmdFunc.printCommandList(msgObj, args);
            break;

        case cmdList.createCron:
            cmdFunc.createCronJob(msgObj, args);
            break;

        case cmdList.startCron:
            cmdFunc.startCronJob(msgObj, args);
            break;

        case cmdList.stopCron:
            cmdFunc.stopCronJob(msgObj, args);
            break;

        default:
            printErrMsg(msgObj);
    }
});

// makes the bot go online
client.login(config.token);
