const router = require("express").Router();
const cfhModel = require("../models/cfh.model");
const { sendError, sendSuccess } = require("../utils/resFormatter");

router.get("/all", async (req, res) => {
  const userId = req.user?._id
  try {
    const cfhs = await cfhModel.find({ userId }).sort({ createdAt: -1 });
    if (!cfhs)
      return sendError(
        res,
        false,
        400,
        "Error on getting CFHs from database.",
        {}
      );

    sendSuccess(res, true, 200, "Successfully got CFHs.", { ...cfhs });
  } catch (error) {
    sendError(res, false, 400, "Catched error on geting CFHs.", error);
  }
});

router.get("/recent", async (req, res) => {
  const userId = req.user?._id
  try {
    const cfhs = await cfhModel.find({ userId }).sort({ createdAt: -1 }).limit(5);
    if (!cfhs)
      return sendError(
        res,
        false,
        400,
        "Error on getting CFHs from database.",
        {}
      );

    sendSuccess(res, true, 200, "Successfully got CFHs.", { ...cfhs });
  } catch (error) {
    sendError(res, false, 400, "Catched error on geting CFHs.", error);
  }
});

router.post("/add", async (req, res) => {
  const userId = req.user?._id
  const {
    totalEmission,
    categoryEmission,
    categoryBreakdown,
    categoryTips,
  } = req.body;
  try {
    const newCfh = await cfhModel.create({
      userId,
      totalEmission,
      categoryBreakdown,
      categoryEmission,
      categoryTips,
    });
    sendSuccess(res, true, 202, `Successfully added CFH id=${newCfh._id}`, {
      ...newCfh,
    });
  } catch (error) {
    sendError(res, false, 400, "Catched error on adding the CFHs.", error);
  }
});

module.exports = router;
