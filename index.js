require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
    ], 
    partials: [
        Partials.Message, 
        Partials.GuildMember, 
        Partials.Reaction, 
        Partials.User, 
        Partials.Channel, 
        Partials.GuildScheduledEvent,
    ],
});

['commands'].forEach(f => client[f] = new Collection());
['commands', 'events'].forEach(f => require(`./src/handlers/${f}`)(client));

client.login(process.env.MTEzNzY0NTIxNjI4Nzk0ODg0MA.GUuut_.YLTcQJ8vxTmU-aaEK1pE9D01UwLlw_pP5SSBEU);
