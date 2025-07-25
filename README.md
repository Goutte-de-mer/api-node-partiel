# Partie 1 : Questions théoriques

## Q1. Expliquer le rôle de express.json() dans une application Express.

`express.json()` est un middleware qui sert à parser le JSON des requêtes HTTP entrantes.
Il convertit les données JSON du body en objet JavaScript accessible via req.body.

## Q2. Quelle est la différence entre route publique et rout protégée ? Donner un exemple pour chaque.

### Route publique

Une route publique est une route accessible sans authentification.

```javascript
router.post(
  "/login",
  loginValidations,
  handleValidationErros,
  async (req, res) => {
    try {
      const result = await userController.loginUser(req.body);
      return res
        .status(200)
        .cookie("auth_token", result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 3600000,
        })
        .json(result.user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);
```

### Route protégée

Une route protégée est une route qui nécessite une authentification (token, session, etc.) pour y accéder.

```javascript
router.patch(
  "/update",
  authenticateToken, // Utilisateur authentifié via token
  updateValidations,
  handleValidationErros,
  async (req, res) => {
    try {
      const userId = req.user.userId;
      const { userName, email } = req.body;

      if (!userName && !email) {
        return res
          .status(400)
          .json({ error: "Nom d'utilisateur ou email requis" });
      }

      const updatedUser = await userController.updateUser(
        userName,
        email,
        userId
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);
```

## Q3. A quoi sert mongoose.model() et comment est-il relié à la base de donnée ?

`mongoose.model()` crée un modèle qui représente une collection MongoDB associée à un schema qui définit la structure des documents.
Le modèle sert d'interface entre le code JavaScript et la collection MongoDB nous permettant de créer, modifier, supprimer et requêter des documents dans une collection MongoDB.

## Q4. Quelle est la différence entre find() et findById avec Mongoose ?

`find()` :

- Recherche plusieurs documents correspondant à un filtre.
- Renvoie un **tableau de résultats**.

`findById(id)` :

- Recherche **un seul document** par son \_id.
- Équivaut à `findOne({ _id: id })`.

## Q5. Expliquer brièvement comment fonctionne l'authentification avec JWT.

Lors d'une authentification avec un JWT :

1. **L'utilisateur se connecte** et le navigateur envoie les informations de connexion au serveur
2. Si les identifiants sont correct, **le serveur créé un JWT** contenant les informations de l'utilisateur et le signe avec une clé secrète.
3. Le **JWT est alors renvoyé au client** et stocké soit en localStorage soit dans les cookies
4. Pour chaque route protégée, **le client renvoie le token au serveur** à travers la requête
5. **Le serveur vérifie la validité du token**, extrait les infos de l'utilisateur et exécute la requête si le token est valide
