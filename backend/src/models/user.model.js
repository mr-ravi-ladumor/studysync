import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
   {
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        firstname: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastname: {
            type: String,
            default: '',
        },
        refreshToken: {
            type: String,
        }
   },
   {
        timestamps: true
   }
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.method.generateAccessToken = function() {
    return jwt.sign({
        _id : this._id,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)}

userSchema.method.generateRefreshToken = function() {
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)}


export const User = model("User", userSchema);