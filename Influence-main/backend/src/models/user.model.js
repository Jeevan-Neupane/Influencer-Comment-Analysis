import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    youtubeChannelUrl: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

}, { timestamps: true })


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
    const payload = {
        userId: this._id,
        username: this.username,

    }

    return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}


const User = mongoose.model("User", userSchema);

export default User;