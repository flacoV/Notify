const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("servicios")
    .setDescription("Muestra los tipos de empresas que esta activo el software."),
    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor("#ffffff")
        .setTitle("Servicios activos")
        .setDescription("Mira el estado del software segun el tipo de empresa.")
        .addFields(
            { name: "Mecanica", value: "✅ Activo", inline: true },
            { name: "Transporte", value: "🛠️ En Desarrollo", inline: true },
            { name: "Seguridad", value: "🛠️ En Desarrollo", inline: true },
            { name: "Servicios/Otros", value: "🛠️ En Desarrollo", inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'Powered by REINNOVA.', iconURL: 'https://i.imgur.com/tvvGQh8.png'})
    await interaction.reply({
        embeds:  [embed],
})
    }
}