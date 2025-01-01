const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = process.env.clientid;

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                if (command.data && command.data.name) {
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                } else {
                    console.error(`Command in file ${file} is missing a required "data" or "data.name" property.`);
                }
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Se estan recargando todos los comandos (/).');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );

                console.log('Se recargaron con éxito todos los comandos (/).');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};


/*
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = (process.env.clientid); 

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({
            version: '10'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Se estan recargando todos los comandos (/).');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );

                console.log('Se recargaron con éxito todos los comandos (/).');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};
*/