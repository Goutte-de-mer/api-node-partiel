const crypto = require("crypto");

const SECRET = process.env.ENCRYPTION_SECRET;
const ALGORITHM = "aes-256-cbc";

const encryptId = (id) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(ALGORITHM, SECRET);
  const encrypted =
    cipher.update(id.toString(), "utf8", "hex") + cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

const decryptId = (encryptedId) => {
  try {
    const [ivHex, encrypted] = encryptedId.split(":");
    const decipher = crypto.createDecipher(ALGORITHM, SECRET);
    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  } catch {
    throw new Error("ID invalide");
  }
};

const transformArticleWithEncryptedId = (article) => {
  const articleObj = article.toObject ? article.toObject() : article;
  return {
    ...articleObj,
    _id: encryptId(articleObj._id),
  };
};

module.exports = { encryptId, decryptId, transformArticleWithEncryptedId };
