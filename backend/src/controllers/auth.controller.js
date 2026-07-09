import { registerUser, loginUser } from "../services/auth.service.js";

// Register a New User
export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
       res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        res.status(200).json({
            message: "Login successful",
            ...result,
        });

    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json({
                message: error.message,
            });
    }
};