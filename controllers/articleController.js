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
      message: "Arctile créé avec succès",
      data: article,
    };
  } catch (error) {
    console.error("Erreur dans createArticle:", error);
    throw new Error("Impossible de créer l'article");
  }
};
