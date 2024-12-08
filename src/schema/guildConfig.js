const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: { type: String, required: true }, // ID del servidor
  servicios: {
    mecanico: { 
      channelId: { type: String, default: null }, // Canal asignado
      activo: { type: Boolean, default: true } // Servicio activado por defecto
    },
    transporte: { 
      channelId: { type: String, default: null }, 
      activo: { type: Boolean, default: true }
    },
    seguridad: { 
      channelId: { type: String, default: null }, 
      activo: { type: Boolean, default: true }
    },
    otros: { 
      channelId: { type: String, default: null }, 
      activo: { type: Boolean, default: true }
    }
  },
  fechaInicio: { type: Date, default: Date.now } // Fecha de registro del servidor
});

module.exports = mongoose.model('Guild', guildSchema);
