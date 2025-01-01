const mongoose = require('mongoose');

const empresaseguridadconfigSchema = new mongoose.Schema({
  empresaseguridadserverId: String,
  empresaseguridadchannelId: String,
  seguridadroleId: {
    type: String,
    required: true,
  },
});

const empresaseguridadconfig = mongoose.model('empresaseguridadconfig', empresaseguridadconfigSchema);

module.exports = empresaseguridadconfig;