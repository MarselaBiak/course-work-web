import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (nickname.toLowerCase() === "admin") {
            const existingAdmin = await User.findOne({ role: "admin" });

            if (existingAdmin) {
                return res.status(400).json({
                    message: "Admin already exists"
                });
            }
        }

        const role = nickname.toLowerCase() === "admin" ? "admin" : "user";

        const user = await User.create({
            nickname,
            email,
            password,
            agree,
            role
        });

        console.log("User created:", user.email, "Role:", role);

        return res.json({ message: "User registered", role });

    } catch (error) {
        console.log("SERVER ERROR SIGNUP:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


router.post("/login", async (req, res) => {
    console.log("LOGIN REQUEST BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

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
        return res.status(500).json({ message: "Server error" });
    }
});
