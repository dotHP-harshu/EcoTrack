const router = require("express").Router()
const { aiSuggestionController, getAiTip } = require("../controllers/ai.controller")

router.post("/tip/:cfhId", aiSuggestionController);

module.exports = router