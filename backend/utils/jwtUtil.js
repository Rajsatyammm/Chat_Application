import jwt from 'jsonwebtoken'

export const generateJwtToken = (user, res) => {
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie('jwtToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
    return token;
}