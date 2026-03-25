const express = require("express");
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", protect, async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user._id
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get Tasks
router.get("/", protect, async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const filter = { user: req.user._id };

        if (req.query.completed) {
            filter.completed = req.query.completed === "true";
        }

        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        // SEARCH FEATURE
        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: "i" } },
                { description: { $regex: req.query.search, $options: "i" } }
            ];
        }

        const tasks = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Task.countDocuments(filter);

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            tasks
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE TASK
router.put("/:id", protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ownership check
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        task.title = req.body.title ?? task.title;
        task.description = req.body.description ?? task.description;
        task.priority = req.body.priority ?? task.priority;
        task.dueDate = req.body.dueDate ?? task.dueDate;
        task.completed = req.body.completed ?? task.completed;

        const updatedTask = await task.save();

        res.json(updatedTask);

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

        // ✅ FIXED LOGIC
        if (
            task.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await task.deleteOne();

        res.json({ message: "Task deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;