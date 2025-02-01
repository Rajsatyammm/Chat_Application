import jwt from 'jsonwebtoken'

export const generateJwtToken = (user, res) => {
    const { _id: id, email, firstName, lastName, userName } = user;
    const token = jwt.sign({ id: id, email: email, firstName: firstName, lastName: lastName, userName: userName }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie('jwtToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" });
    return token;
}