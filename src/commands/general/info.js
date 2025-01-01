const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Un poco sobre nosotros."),

    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setColor("#ffffff")
        .setTitle("Reinnova")
        .setURL("https://discord.gg/5etM997DXq")
        .setAuthor({ name: 'Dev Team', iconURL: 'https://i.imgur.com/tvvGQh8.png', url: 'https://discord.gg/5etM997DXq'})
        .setDescription("Empresa líder en el mundo tecnológico, fundada en el 2005 por H. Schrader.\nBuscamos facilitar tanto a los empresarios como a los empleados.\nNos encargamos de mantener notificados a todos los empleados de su tarea activa y de lo que tienen que realizar.")
        .addFields(
            {name: "Soporte Premium", value: "𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳 𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳𝅳 𝅳👤", inline: true},
            {name: "Buenos Precios", value: "𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳𝅳 𝅳𝅳 𝅳 𝅳𝅳💵", inline: true},
            {name: "Ultima Tecnologia", value: "𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳𝅳 𝅳🌐", inline: true},
        )
        .setImage("https://i.imgur.com/W8YIEU9.png")
        .setTimestamp()
        .setFooter({ text: 'Ciudad de Los Santos', iconURL: 'https://i.imgur.com/C6GXDqO.png'})
        await interaction.reply({
            embeds:  [embed],
    })
    }

}