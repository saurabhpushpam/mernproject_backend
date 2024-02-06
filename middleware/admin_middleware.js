const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);

    const adminrole = req.user.isAdmin;
    if (!adminrole) {
      return res.status(403).json({ message: "Access denied. User is not an admin" })
    }

    // res.status(200).json({ msg: req.user.isAdmin });

    // if user is admin then proceed to the next middleware
    next();
    // toh routes e ahle auth middleware se verify karega ki user valid hai ya nahi then uske next() se agla middleware yani yah adminmiddleware me check karenge ki user admin hai nahi yadi user admin hai then next() call hoga that means controller me jayega 
  }
  catch (error) {
    next(error);
  }
}

module.exports = adminMiddleware;