const express = require("express");
const router = express.Router();
const { getItem, addItem, updateItem, deleteItem } = require("../controllers/itemsController");

// GET all items
router.get("/", getItem);

// POST new item
router.post("/", addItem);

router.post('/api/reports', async (req, res) => {
  try {
    const report = new Report({
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      purchasedAt: new Date(),
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create report', error: err });
  }
});
// PUT update item
router.put("/:id", updateItem);

// DELETE item
router.delete("/:id", deleteItem);

module.exports = router;
