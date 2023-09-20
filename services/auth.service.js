const { OAuth2Client } = require("google-auth-library");
const UserModel = require('../models/user.model');
const { profile } = require("winston");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class AuthService {

    async verifyGoogleToken(token) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID,
            });
            return { payload: ticket.getPayload() };
        } catch (error) {
            return { error: "Invalid user detected. Please try again" };
        }
    }
    async loginwithGoogle(token) {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();
        const user = {
            name: name,
            email: email,
            picture: picture
        }
        return user;
    }

    async createUser(user) {
        return UserModel.create(user);
    }

    async findUserByEmail(email) {
        return UserModel.findOne({
            where: {
                email: email,
                is_active: true
            }
        })
    }

    async findUserById(id) {
        return UserModel.findByPk(id);
    }

    async logoutUser(token, exp) {
        const now = new Date();
        const expire = new Date(exp * 1000);
        const milliseconds = expire.getTime() - now.getTime();
        /* ----------------------------- BlackList Token ---------------------------- */
        return cacheUtil.set(token, token, milliseconds);
    }
    async update_user_verification(id) {
        return UserModel.update({
            is_active: true,
            is_verified: true,
            token:''
        }, {
            where: {
                userId: id
            }
        });
    }
    async updateuser_activation(id, activestatus) {
        return UserModel.update({
            is_active: activestatus

        }, {
            where: {
                userId: id
            }
        });
    }
    async update_profile(userdata,user){
         
        return await UserModel.update({
            firstname:userdata.body.firstname,
            lastname:userdata.body.lastname,
            phone:userdata.body.phone,
            // city:userdata.city,
            // country:userdata?.country,
            // zipcode:userdata?.zipcode,
            querylimit:parseInt(userdata.body.querylimit),
            profile_image: userdata.file!=null? userdata.file.buffer:user.profile_image,
            profile_image_type: userdata.file!=null?userdata.file.mimetype:user.profile_image_type,
            matrix_of_intrest:userdata.body.matrix_of_intrest,
            field:userdata.body.field ,
            role: userdata.body.role,
            company:userdata.body.company       
        }, {
            where: {
                userId: userdata.user.id
            }
        });
    }

    async generate_user_reset_token(id,token) {
        return UserModel.update({
            reset_token:token
        }, {
            where: {
                userId: id
            }
        });
    }
    async update_user_password_with_token(id,password) {
        return UserModel.update({
            reset_token:'',
            password:password
        }, {
            where: {
                userId: id
            }
        });
    }
}
module.exports = AuthService;