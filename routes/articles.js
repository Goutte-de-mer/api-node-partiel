var express = require("express");
var router = express.Router();
const { createArticle } = require("../controllers/articleController");
const {
  newArticleValidations,
  handleValidationErrors,
} = require("../middlewares/articleValidations");

router.post(
  "/new",
  newArticleValidations,
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await createArticle(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la création de l'article",
      });
    }
  }
);

module.exports = router;
