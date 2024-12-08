const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("horahub")
    .setDescription("Muestra la hora actual del servidor en las Islas Canarias."),
  async execute(interaction) {
    // Obtener la hora actual ajustada a la zona horaria UTC+0 (Islas Canarias)
    const horaActual = new Date();
    const horaCanarias = new Date(horaActual.toLocaleString("en-US", { timeZone: "Atlantic/Canary" }));
    
    const horas = horaCanarias.getHours();
    const minutos = horaCanarias.getMinutes();

    // Crear el embed con la hora ajustada
    const embed = new EmbedBuilder()
      .setColor("#001eff")
      .setTitle("Hora actual en la ciudad")
      .setDescription(`Hora (HUB): ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')} hs`);

    // Responder al comando
    await interaction.reply({
      embeds: [embed],
    });
  },
};


/*
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("horahub")
    .setDescription("Muestra la hora actual del servidor."),
  async execute(interaction) {
    const horaActual = new Date();
    const horas = horaActual.getHours();
    const minutos = horaActual.getMinutes();

    const embed = new EmbedBuilder()
      .setColor("#001eff")
      .setTitle("Hora actual en la ciudad")
      .setDescription(`Hora (HUB): ${horas}:${minutos} hs`);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
*/