const { body, validationResult } = require("express-validator");

const newArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Le titre ne peut pas être vide")
    .isString()
    .withMessage("Le titre doit être une chaîne de caractères")
    .isLength({ min: 3, max: 200 })
    .withMessage("Le titre doit contenir entre 3 et 200 caractères"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("L'article doit avoir un contenu")
    .isString()
    .withMessage("Le contenu doit être une chaîne de caractères")
    .isLength({ min: 10 })
    .withMessage("Le contenu doit contenir au moins 10 caractères"),

  body("author")
    .optional()
    .trim()
    .isString()
    .withMessage("L'auteur doit être une chaîne de caractères")
    .isLength({ min: 2, max: 100 })
    .withMessage("Le nom de l'auteur doit contenir entre 2 et 100 caractères"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Erreurs de validation",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};

module.exports = { newArticleValidations, handleValidationErrors };
