const {
  decryptId,
  transformArticleWithEncryptedId,
} = require("../utils/idEncryption");

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
      data: transformArticleWithEncryptedId(article),
    };
  } catch (error) {
    console.error("Erreur dans createArticle :", error.message);
    throw new Error("Impossible de créer l'article");
  }
};

exports.getArticles = async () => {
  try {
    const rawArticles = await Article.find();
    const articles = rawArticles.map(transformArticleWithEncryptedId);
    return { success: true, articles };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles :",
      error.message
    );
    throw new Error("Impossible de récupérer les articles");
  }
};

exports.getArticleById = async ({ id }) => {
  try {
    const decyptedId = decryptId(id);
    const article = await Article.findById(decyptedId);
    if (!article) {
      const error = new Error("Article introuvable");
      error.status = 404;
      throw error;
    }

    return { success: true, article: transformArticleWithEncryptedId(article) };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'article :",
      error.message
    );
    throw new Error("Erreur lors de la récupération de l'article");
  }
};

exports.deleteArticleById = async ({ id }) => {
  try {
    const decyptedId = decryptId(id);
    const result = await Article.deleteOne({ _id: decyptedId });
    if (result.deletedCount === 0) {
      const error = new Error("Tâche introuvable");
      error.status = 404;
      throw error;
    }
    return { success: true, message: "Tâche supprimée avec succès" };
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de l'article :",
      error.message
    );
    throw new Error("Erreur lors de la suppression de l'article");
  }
};

// 688340b31a7ced9a35e0f27f
