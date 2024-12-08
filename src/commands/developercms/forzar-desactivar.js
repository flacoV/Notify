const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../../schema/guildConfig.js"); // Ajusta la ruta según la ubicación del modelo

module.exports = {
    data: new SlashCommandBuilder()
        .setName("forzar-desactivar")
        .setDescription("Desactiva un servicio específico en cualquier servidor.")
        .addStringOption(option =>
            option.setName("guild-id")
                .setDescription("ID del servidor donde desactivar el servicio.")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("servicio")
                .setDescription("Nombre del servicio a desactivar (mecanico, transporte, etc.).")
                .setRequired(true)),

    async execute(interaction) {
        // Validar si el usuario tiene permiso
        if (interaction.user.id !== process.env.rolceo) {
            return interaction.reply({
                content: "No tienes permiso para ejecutar este comando.",
                ephemeral: true
            });
        }

        const guildId = interaction.options.getString("guild-id");
        const servicio = interaction.options.getString("servicio").toLowerCase();

        try {
            const guild = await Guild.findOne({ guildId });
            if (!guild) {
                return interaction.reply(`El servidor con ID ${guildId} no está registrado.`);
            }

            if (!guild.servicios[servicio]) {
                return interaction.reply(`El servicio "${servicio}" no está configurado para este servidor.`);
            }

            // Desactivar el servicio
            guild.servicios[servicio].activo = false;
            await guild.save();

            return interaction.reply(`El servicio "${servicio}" ha sido desactivado en el servidor ${guildId}.`);
        } catch (error) {
            console.error(error);
            return interaction.reply("Hubo un error al desactivar el servicio.");
        }
    }
};
