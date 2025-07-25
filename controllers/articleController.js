//  const error = new Error("Email inconnu");
//     error.status = 404;
//     throw error;

const Article = require("../db/models/Article");

exports.createArticle = async ({ title, content, author }) => {
  try {
    const article = await Article.create({
      title,
      content,
      author: author || null,
    });
    return {
      success: true,
      message: "Article créé avec succès",
      data: article,
    };
  } catch (error) {
    console.error("Erreur dans createArticle:", error.message);
    throw new Error("Impossible de créer l'article");
  }
};

exports.getArticles = async () => {
  try {
    const articles = await Article.find();
    return { success: true, articles };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles:",
      error.message
    );
    throw new Error("Impossible de récupérer les articles");
  }
};

exports.getArticleById = async ({ id }) => {
  try {
    const article = await Article.findById(id);
    return { success: true, article };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles:",
      error.message
    );
    throw new Error("Erreur lors de la récupération de l'article");
  }
};
