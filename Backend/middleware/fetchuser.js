const jwt = require('jsonwebtoken');
const JWT_SECRET = "firstToken";

const fetchuser = (req, res, next) => {
    /// get the user from the jwt token (because in token data is store (i have pass the id as data in token))
    const token = req.header("auth_token") //// token header se lekr aaunga
    if (!token) {
        return res.status(401).json({ error: "please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; 
        // So after decoding, data = { user: { id: "someUserId(example = 1)" }, iat: ... } 
        /// verify ho gya to data.user me jo id mila hai req.user all data show kr de
        /// e storing the user’s ID (or whatever was in the token) into the request, 
        // and you can use it to get the full user object from the database.    
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "please authenticate using a valid token" });
    }
}
module.exports = fetchuser;