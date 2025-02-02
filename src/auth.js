const argon2 = require('argon2')

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

const hashedPassword = (req, res, next) => {
    const password = req.body.password
    argon2.hash(password, hashingOptions).then((hashedPassword) => {console.log(hashedPassword);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
}).catch((err) => {
    console.error(err);
    res.sendStatus(500);
}); 
};

module.exports = {
    hashedPassword,
};