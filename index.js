const { Client, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
});

module.exports = client;
client.config = require("./config.json");
require("./handler")(client);


client.login(client.config.token).catch((e) => { console.log(e) })