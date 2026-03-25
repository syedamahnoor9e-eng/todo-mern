const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const Task = require("../models/Task")

const router = express.Router();
const { protect,admin } = require("../middleware/authMiddleware");

router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
});
router.get("/admin-only", protect, admin, (req, res) => {
    res.json({ message: "Welcome Admin!" });
});
//POST API(REGISTER)

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword
            }
        );

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({ message: "User registered successfully.", token });
    }
    catch (error) {
       return res.status(500).json({ message: error.message });
    }
});

//POST API LOGIN

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials." })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
//make-admin
router.put("/make-admin/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ message: "User is already an admin" });
        }

        user.role = "admin";
        await user.save();

        res.json({ message: "User promoted to admin" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// DELETE ACCOUNT
router.delete("/delete-account", protect, async (req, res) => {
    try {
        const userId = req.user._id;

        // Delete user's tasks first
        await Task.deleteMany({ user: userId });

        // Delete user
        await User.findByIdAndDelete(userId);

        res.json({ message: "Account and tasks deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET ALL USERS (ADMIN)
router.get("/all-users", protect, admin, async (req, res) => {
    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// DELETE USER (ADMIN)
router.delete("/delete-user/:id", protect, admin, async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot delete yourself" });
        }

        // Delete user's tasks first
        await Task.deleteMany({ user: user._id });

        // Delete user
        await user.deleteOne();

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET ALL TASKS (ADMIN)
router.get("/all-tasks", protect, admin, async (req, res) => {
    try {

        const tasks = await require("../models/Task")
            .find()
            .populate("user", "email name");

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET TASKS OF A SPECIFIC USER (ADMIN)
router.get("/user-tasks/:id", protect, admin, async (req, res) => {
    try {

        const Task = require("../models/Task");

        const tasks = await Task.find({ user: req.params.id })
            .populate("user", "name email");

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// DELETE TASK
router.delete("/:id", protect, async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});
//Admin Stats
router.get("/stats", protect, admin, async (req, res) => {

    const User = require("../models/User");
    const Task = require("../models/Task");

    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ completed: true });
    const pendingTasks = await Task.countDocuments({ completed: false });

    res.json({
        totalUsers,
        totalTasks,
        completedTasks,
        pendingTasks
    });

});
module.exports = router;
