const mongoose = require("mongoose")

const aiTipSchema = mongoose.Schema({
  tipText: {
    type: String,
    required: true,
  },
  cfhId: {
    type: mongoose.Types.ObjectId,
    ref: "cfh",
  },
}, { timestamp: true });

module.exports = mongoose.model("aiTip", aiTipSchema)

