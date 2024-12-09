// schema/empresasConfig.js
const mongoose = require('mongoose');

const empresasConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true },
  empresas: {
    mecanico: { canal: { type: String, default: null } },
    transporte: { canal: { type: String, default: null } },
    seguridad: { canal: { type: String, default: null } },
    servicios: { canal: { type: String, default: null } },
  },
});

module.exports = mongoose.model('EmpresasConfig', empresasConfigSchema);
