const userModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let timestamp = new Date().toLocaleString();
  let url = req.originalUrl;
  let method = req.method;
  console.log(`${method} -- ${timestamp}--- ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    const user = await userModel.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "not found" });
    } else {
      req.currentUser = user;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).json({ message: " gerekli name alanı eksik" });
    } else {
      next();
    }
  } catch (error) {}
  // SİHRİNİZİ GÖRELİM
  next(error);
}

function validatePost(req, res, next) {
  try {
    let { text } = req.body;
    if (!text) {
      res.status(400).json({ message: " eksik" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
  // SİHRİNİZİ GÖRELİM
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
};
