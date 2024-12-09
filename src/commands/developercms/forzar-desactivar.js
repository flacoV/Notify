const { SlashCommandBuilder } = require("@discordjs/builders");

const ceonotify = process.env.ceonotify.split(",");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("expulsarbot")
    .setDescription("Saca al bot de un servidor especificado.")
    .addStringOption(option =>
      option.setName("guildid")
        .setDescription("El ID del servidor del cual quieres sacar al bot.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userId = interaction.user.id;

    // Verificar permisos del usuario
    if (!ceonotify.includes(userId)) {
      await interaction.reply({
        content: "No tienes permiso para ejecutar este comando. Contacta con el proveedor.",
        ephemeral: true,
      });
      return;
    }

    const guildId = interaction.options.getString("guildid");

    try {
      const guild = await interaction.client.guilds.fetch(guildId);

      if (!guild) {
        await interaction.reply({
          content: `No se pudo encontrar un servidor con el ID proporcionado: ${guildId}`,
          ephemeral: true,
        });
        return;
      }

      // Confirmar y salir del servidor
      await guild.leave();
      await interaction.reply({
        content: `El bot ha salido del servidor **${guild.name}** (ID: ${guildId}).`,
        ephemeral: true,
      });

      console.log(`El bot ha salido del servidor: ${guild.name} (ID: ${guildId}).`);
    } catch (error) {
      console.error(`Error al intentar salir del servidor con ID ${guildId}:`, error);
      await interaction.reply({
        content: "Ocurrió un error al intentar sacar al bot del servidor. Revisa que el ID sea correcto.",
        ephemeral: true,
      });
    }
  },
};




/*
const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../../schema/empresasConfig.js"); // Ajusta la ruta según la ubicación del modelo

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
*/