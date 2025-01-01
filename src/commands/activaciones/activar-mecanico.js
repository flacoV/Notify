const { SlashCommandBuilder } = require('@discordjs/builders');
const empresamecanicoconfig = require('../../schema/legal/empresamecanicoconfig');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('empresamecanico')
    .setDescription('Activa el notificador para mecánicos')
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('El canal donde se enviarán las notificaciones')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('rol')
        .setDescription('El rol que será mencionado en las notificaciones')
        .setRequired(true)),
  async execute(interaction) {
    const canal = interaction.options.getChannel('canal');
    const rol = interaction.options.getRole('rol');

    const serverId = interaction.guild.id;
    const channelId = canal.id;
    const roleId = rol.id;

    try {
      await empresamecanicoconfig.findOneAndUpdate(
        { mecanicoserverId: serverId },
        { mecanicochannelId: channelId, mecanicoroleId: roleId },
        { upsert: true, new: true }
      );

      await interaction.reply(`Gracias por elegirnos!.\nSe configuro el canal <#${channelId}> para recibir avisos de trabajos correctamente. \nSe notificara via el rol: <@&${roleId}>.`);
    } catch (error) {
      console.error('Error al activar el notificador:', error);
      await interaction.reply('Hubo un error al activar el notificador.');
    }
  },
};




/*
const { SlashCommandBuilder } = require("@discordjs/builders");
const empresamecanicoconfig = require("../../schema/legal/empresamecanicoconfig");

const ceonotify = process.env.ceonotify.split(",");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("empresamecanico")
    .setDescription("Establece el canal donde serán enviados los avisos.")
    .addChannelOption(option =>
      option.setName("canal")
        .setDescription("Selecciona el canal donde se enviarán los avisos.")
        .setRequired(true)
    )
    .addRoleOption(option =>
      option.setName('rol')
        .setDescription('El rol que será mencionado en las notificaciones')
        .setRequired(true)),
    
  async execute(interaction) {
    const userId = interaction.user.id;
    
    if (!ceonotify.includes(userId)) {
      await interaction.reply({ content: "No tienes permiso para ejecutar este comando. Contacta con el proveedor!", ephemeral: true });
      return;
    }

    const mecanicoserverId = interaction.guild.id;
    const mecanicochannelId = interaction.options.getChannel("canal").id;
    const mecanicoroleId = interaction.options.getChannel("rol").id;

    try {
      await empresamecanicoconfig.findOneAndUpdate(
        { mecanicoserverId },
        { mecanicochannelId },
        { mecanicoroleId },
        { upsert: true }
      );

      console.log(`Canal configurado para recibir alertas sobre las actividades de empresas de mecanico en el servidor ${mecanicoserverId}, en el canal ${mecanicochannelId}, seran notificados todos los ${mecanicoroleId}.`);

      await interaction.reply({ content: "Canal configurado para recibir avisos de empresas de mecanico en el servidor.", ephemeral: true });
    } catch (error) {
      console.error("Error al configurar el canal:", error);
      await interaction.reply({ content: "Ocurrió un error al configurar el canal.", ephemeral: true });
    }
  },
};
*/
