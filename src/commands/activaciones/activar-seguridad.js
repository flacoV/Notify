const { SlashCommandBuilder } = require("@discordjs/builders");
const empresaseguridadconfig = require("../../schema/legal/empresaseguridadconfig");

const ceonotify = process.env.ceonotify.split(",");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("empresaseguridad")
    .setDescription("Establece el canal donde serán enviados los avisos.")
    .addChannelOption(option =>
      option.setName("canal")
        .setDescription("Selecciona el canal donde se enviarán los avisos.")
        .setRequired(true))
    .addRoleOption(option => 
      option.setName("rol")
       .setDescription("El rol que será mencionado en las notificaciones")
       .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    
    if (!ceonotify.includes(userId)) {
      await interaction.reply({ content: "No tienes permiso para ejecutar este comando. Contacta con el proveedor!", ephemeral: true });
      return;
    }
    const canal = interaction.options.getChannel('canal');
    const rol = interaction.options.getRole('rol');


    const serverId = interaction.guild.id;
    const channelId = canal.id;
    const roleId = rol.id;

    try {
      await empresaseguridadconfig.findOneAndUpdate(
        { empresaseguridadserverId: serverId },
        { empresaseguridadchannelId: channelId, seguridadroleId: roleId},
        { upsert: true, new: true }
      );

      await interaction.reply(`Gracias por elegirnos!.\nSe configuro el canal <#${channelId}> para recibir avisos de trabajos correctamente. \nSe notificara via el rol: <@&${roleId}>.`);
    } catch (error) {
      console.error('Error al activar el notificador:', error);
      await interaction.reply('Hubo un error al activar el notificador.');
    }
  },
};