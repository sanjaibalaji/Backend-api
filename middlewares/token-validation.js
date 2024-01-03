const jwt = require('jsonwebtoken');

const secretKey = 'sjakfdhhhhhhhsahfaskhfkashfkashfnhhhhhkaskk'; // Replace with your actual secret key

const authenticateToken = (req, res, next) => {

  const token1 = req.headers['authorization'];
  const token =  token1.split(" ")[1]
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }

    req.user = user; // Attach the decoded user information to the request object
    next();
  });
};

module.exports = authenticateToken;
