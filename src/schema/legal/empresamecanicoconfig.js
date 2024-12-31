const mongoose = require('mongoose');

const empresamecanicoconfigSchema = new mongoose.Schema({
  mecanicoserverId: String,
  mecanicochannelId: String,
  mecanicoroleId: {
    type: String,
    required: true,
  },
});

const empresamecanicoconfig = mongoose.model('empresamecanicoconfig', empresamecanicoconfigSchema);

module.exports = empresamecanicoconfig;