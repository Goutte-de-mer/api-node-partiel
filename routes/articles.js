var express = require("express");
var router = express.Router();
const {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticleById,
} = require("../controllers/articleController");
const {
  newArticleValidations,
  idValidation,
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
        message: error.message,
      });
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const result = await getArticles();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getArticleById(req.params);
    res.status(200).json(result);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete(
  "/delete/:id",
  idValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await deleteArticleById(req.params);
      return res.status(200).json(result);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
