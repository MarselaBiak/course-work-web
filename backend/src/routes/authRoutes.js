import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// ===================== SIGN UP =====================
router.post("/signup", async (req, res) => {
    console.log("SIGNUP REQUEST BODY:", req.body);

    const { nickname, email, password, agree } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    if (agree !== true) {
        return res.status(400).json({ message: "You must accept the agreement" });
    }

    try {
        // Проверяем, существует ли пользователь
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Создаём пользователя — хеширования вручную НЕ НУЖНО!
        // Потому что модель User.js сама делает hash в pre("save")
        const user = await User.create({
            nickname: nickname || "",
            email,
            password,  // <-- обычный пароль (будет захеширован автоматически)
            agree
        });

        console.log("User created:", user.email);

        return res.json({ message: "User registered" });

    } catch (error) {
        console.log("SERVER ERROR SIGNUP:", error);
        return res.status(500).json({ message: "Server error" });
    }
});



// ===================== LOGIN =====================
router.post("/login", async (req, res) => {
    console.log("LOGIN REQUEST BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Важно! select("+password") потому что в User.js поле скрыто
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            console.log("User NOT found");
            return res.status(400).json({ message: "User not found" });
        }

        // Сравниваем пароли
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Wrong password");
            return res.status(400).json({ message: "Wrong password" });
        }

        // Создаем JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login success",
            token,
            user: {
                id: user._id,
                email: user.email,
                nickname: user.nickname,
                role: user.role
            }
        });

    } catch (error) {
        console.log("SERVER ERROR LOGIN:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


export default router;
