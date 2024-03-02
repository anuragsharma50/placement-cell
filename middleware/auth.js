import jwt from "jsonwebtoken";

export const auth = async (req,res,next) => {
    const { token } = req.cookies;
    if(!token) {
        return res.redirect('/signin');
    }
    const userId = await jwt.verify(token,process.env.JWT_SECRET);
    req.userId = userId;
    res.locals.userId = userId;
    next();
}
