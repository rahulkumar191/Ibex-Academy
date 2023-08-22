const jwt = require('jsonwebtoken');
const secretKey = 'mycode';

const generateJWT = (user) => {
  const token = jwt.sign(user, secretKey, {expiresIn: '1h'});
  return token;
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader--->", authHeader);
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if(err) res.status(403).json({message: "User authentication failed"});
      else{
        req.user = user;
        next();
      }
    });
  }
  else res.sendStatus(401);
}


module.exports ={ generateJWT, authenticateJWT};