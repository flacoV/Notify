const { SlashCommandBuilder } = require("@discordjs/builders");
const empresamecanicoconfig = require("../../schema/legal/empresamecanicoconfig");

const ceonotify = process.env.ceonotify.split(",");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("desactivar-mecanico")
    .setDescription("Elimina la configuración del canal donde se enviarán los avisos de las empresas de mecánico."),
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

    const mecanicoserverId = interaction.guild.id;

    try {
      // Diferir la respuesta para manejar tiempos más largos
      await interaction.deferReply({ ephemeral: true });

      // Buscar y eliminar configuración
      const deletedConfig = await empresamecanicoconfig.findOneAndDelete({
        mecanicoserverId,
      });

      if (deletedConfig) {
        await interaction.editReply({
          content: "La configuración del canal ha sido eliminada correctamente para este servidor.",
        });
      } else {
        await interaction.editReply({
          content: "No se encontró ninguna configuración para este servidor.",
        });
      }
    } catch (error) {
      console.error("Error al eliminar la configuración del servidor:", error);

      // Manejo de errores en la interacción
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "Ocurrió un error al eliminar la configuración del servidor. Por favor, intenta nuevamente.",
          ephemeral: true,
        });
      } else {
        await interaction.editReply({
          content: "Ocurrió un error inesperado al procesar tu solicitud.",
        });
      }
    }
  },
};



`const { SlashCommandBuilder } = require("@discordjs/builders");
const empresamecanicoconfig = require("../../schema/legal/empresamecanicoconfig");

const ceonotify = process.env.ceonotify.split(",");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("desactivar-mecanico")
    .setDescription("Elimina la configuración del canal donde se enviarán los avisos de las empresas de mecanico."),
  async execute(interaction) {
    const userId = interaction.user.id;
    
    if (!ceonotify.includes(userId)) {
      await interaction.reply({ content: "No tienes permiso para ejecutar este comando. Contacta con el proveedor!", ephemeral: true });
      return;
    }

    const mecanicoserverId = interaction.guild.id;

    try {
      const deletedConfig = await empresamecanicoconfig.findOneAndDelete({ mecanicoserverId });
      
      if (deletedConfig) {
        await interaction.reply({ content: "Configuración del canal eliminada correctamente para este servidor.", ephemeral: true });
      } else {
        await interaction.reply({ content: "No se encontró ninguna configuración para este servidor.", ephemeral: true });
      }
    } catch (error) {
      console.error("Error al eliminar la configuración del servidor:", error);
      await interaction.reply({ content: "Ocurrió un error al eliminar la configuración del servidor.", ephemeral: true });
    }
  },
};`