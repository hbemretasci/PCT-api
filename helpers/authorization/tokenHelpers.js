const sendJwtToClient = (user, res) => {
    const token = user.generateJwtFromUser();
    
    const { JWT_EXPIRE } = process.env;

    return res.status(200).json({
        success: true,
        access_token: token,
        expiresIn: JWT_EXPIRE,
        data: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}

const isTokenIncluded = req => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
}

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
}