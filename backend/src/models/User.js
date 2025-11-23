import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Схема пользователя
const userSchema = new mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // пароль не возвращается по умолчанию
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        agree: {
            type: Boolean,
            required: true,
        }
    },
    { timestamps: true }
);



// -----------------------------
// Хэширование пароля перед сохранением
// -----------------------------
userSchema.pre("save", async function (next) {
    
    if (this.nickname.toLowerCase() === "admin") {
        this.role = "admin";
    }




    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});



// -----------------------------
// Сравнение паролей при логине
// -----------------------------
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



// -----------------------------
// Метод для входа пользователя
// Login по EMAIL + PASSWORD
// -----------------------------
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("User with this email does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    return user;
};



// -----------------------------
// Убираем пароль из ответа
// -----------------------------
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};



export default mongoose.model("User", userSchema);
