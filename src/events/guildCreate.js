const Guild = require('../schema/empresasConfig.js')

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        try {
            const existe = await Guild.findOne({ guildId: guild.id });
            if (!existe) {
                await Guild.create({
                    guildId: guild.id,
                    servicios: {
                        mecanico: { activo: true },
                        transporte: { activo: true },
                        seguridad: { activo: true },
                        servicios: { activo: true },
                    },
                });
                console.log(`Servidor registrado: ${guild.id}`);
            }
        } catch (error) {
            console.error(`Error al registrar el servidor ${guild.id}:`, error);
        }
    },
};