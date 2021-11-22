const jwt = require('jsonwebtoken');

module.exports = (res, req, next) => {
    try {
        console.log(req.header);
        const token = req.header("x-auth-token");
        // console.log(token);
        if (!token) {
            res.send('access denied')
        }
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decode;
        next();

    } catch (error) {
        console.log(error);
    }
}