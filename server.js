const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = "my_secret_key";

// Store users in an array
let users = [];

// Register route
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const userExists = users.find(
        (user) => user.username === username
    );

    if (userExists) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    users.push({
        username: username,
        password: password
    });

    res.status(201).json({
        message: "Registration successful"
    });
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (item) =>
            item.username === username &&
            item.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const token = jwt.sign(
        { username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token: token
    });
});

// Middleware to check JWT
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// Protected route
app.get("/protected", verifyToken, (req, res) => {
    res.json({
        message: "Welcome! You accessed the protected route.",
        username: req.user.username
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});