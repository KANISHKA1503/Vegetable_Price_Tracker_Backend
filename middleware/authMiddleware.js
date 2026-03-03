const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    
    const bearerToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);

    req.userData = {
      id: decoded.userId || decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized",
      message: err.message
    });
  }
};


const isAdmin = (req, res, next) => {
  if (req.userData.role !== "admin") {
    res.status(403).json({ error: "Admin access only" });
    return;
  }
  next();
};


const isFarmer = (req, res, next) => {
  if (req.userData.role !== "farmer") {
    res.status(403).json({ error: "Farmer access only" });
    return;
  }
  next();
};

module.exports = { auth, isAdmin, isFarmer };
