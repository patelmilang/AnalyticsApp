const AuthService = require('../services/auth.service');
const jwtConfig = require('../config/jwt.config');
const bcryptUtil = require('../utils/bcrypt.util');
const jwtUtil = require('../utils/jwt.util');
const crypto = require('crypto');
let authService = new AuthService();
const sendmail = require('../utils/mail.util');




exports.register = async (req, res) => {
    const isExist = await authService.findUserByEmail(req.body.email);
    if (isExist) {
        return res.status(400).json({
            message: 'Email already exists.'
        });
    }
    const hashedPassword = await bcryptUtil.createHash(req.body.password);
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        createdAt: new Date(),
        token: crypto.randomBytes(32).toString('hex'),
        auth_type: 'LOCAL',
        is_active: true,
        is_verified: false
    }
    const user = await authService.createUser(userData);
    const link = `${process.env.BASE_URL}/register/verification/${user.userId}/${user.token}`;
    const subject = 'Analytics model – email verification';
    const emailbody = `
    <html>
    <body>
    Hello ${userData.firstname},

    You registered an account on Analytics model, before being able to use your account you need to verify that this is your email address by clicking here: 
    <a href='${link}'  target="_blank" > verify here </a>
    
    Kind Regards,
    Analytics model Team.
    </body>
    </html>
    `
    await sendmail(user.email, subject, emailbody);
    return res.json({
        data: user,
        message: 'User registered successfully.'
    });
}

exports.login = async (req, res) => {
    const user = await authService.findUserByEmail(req.body.email);
    if (user) {
        if (user.is_verified) {
            const isMatched = await bcryptUtil.compareHash(req.body.password, user.password);
            if (isMatched) {
                const userToken={
                    email:user.email,
                    firstname:user.firstname,
                    lastname:user.lastname,

                }
                const token = await jwtUtil.createToken({ id: user.userId, user: userToken });
                return res.json({
                    access_token: token,
                    token_type: 'Bearer',
                    expires_in: jwtConfig.ttl
                });
            }
            else
                return res.status(200).json({ message: 'Invalid Password' });

        }
        else {
            return res.status(200).json({ message: 'Verify your account first.' });
        }

    }
    return res.status(400).json({ message: 'Invalid email or password.' });
}

exports.getUser = async (req, res) => {
    const result = await authService.findUserById(req.user.id);
    if (result)
    result.profile_image =`data:${result.profile_image_type};base64, ${result.profile_image.toString('base64')}`;
    return res.json({
        data: result,
        message: 'Success.'
    });
}

exports.logout = async (req, res) => {
    await authService.logoutUser(req.token, req.user.exp);
    return res.json({ message: 'Logged out successfully.' });
}

exports.googlelogin = async (req, res) => {
    const user = await authService.loginwithGoogle(req.body.credential);
    if (user) {
        const hashedPassword = await bcryptUtil.createHash('random@#$%^(1823*&');
        const userData = {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            createdAt: new Date(),
            token: crypto.randomBytes(32).toString('hex'),
            auth_type: 'GOOGLE',
            is_active: true,
            is_verified: false,
            role: 'GUEST'
        }
        let isExistuser = await authService.findUserByEmail(req.body.email)
        if (!isExistuser) {
            isExistuser = await authService.createUser(user);
        }
        const token = await jwtUtil.createToken({ id: isExistuser.userId, user: isExistuser });
        return res.json({
            access_token: token,
            token_type: 'Bearer',
            expires_in: jwtConfig.ttl,
            user: user
        });

    }
    return res.status(400).json({ message: 'Unauthorized.' });
}
exports.verify_account = async (req, res) => {
    try {
        const user = await authService.findUserById(req.params.id);
        if (!user || user.token != req.params.token) return res.status(400).send("Invalid link");
        // const token = await Token.findOne({
        //   userId: user._id,
        //   token: req.params.token,
        // });
        // if (!token) return res.status(400).send("Invalid link");

        await authService.update_user_verification(req.params.id);


        res.json({ message: "email verified sucessfully" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}
exports.resetpassword = async (req, res) => {
    const user = await authService.findUserByEmail(req.body.email);
    if (user) {
        const isMatched = await bcryptUtil.compareHash(req.body.oldpassword, user.password);
        if (isMatched) {
            const hashedPassword = await bcryptUtil.createHash(req.body.password);
            const result = await authService.resetpassword(req.body.is_active, req.user.id);
            return res.json({
                message: 'reset password successfully.'
            });
        }
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}

exports.update = async (req, res) => {
    const user = await authService.findUserById(req.user.id)
    if (user) {

        await authService.update_profile(req);
        const result = await authService.findUserById(req.user.id);
        if (result)
            result.profile_image =`data:${result.profile_image_type};base64, ${result.profile_image.toString('base64')}`;
        return res.json({
            data: result,
            message: 'updated successfully.'
        });
    }
    return res.status(400).json({ message: 'Unauthorized.' });
}