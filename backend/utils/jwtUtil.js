import jwt from 'jsonwebtoken'

export const generateJwtToken = (user, res) => {
    const { _id, email, firstName, lastName, userName, createdAt, profilePic } = user;
    const token = jwt.sign({
       _id: _id,
       email: email, 
       firstName: firstName, 
       lastName: lastName, 
       userName: userName, 
       createdAt, profilePic: 
       profilePic 
    }, process.env.JWT_SECRET, { expiresIn: '3d' });

    return token;
}