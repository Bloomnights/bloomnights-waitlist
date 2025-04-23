exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token here (e.g., using JWT)
    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
    }
};
