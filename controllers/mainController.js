const service = require("../services/mainService")

exports.create = (req, res) => {
    const { title, secret } = req.body

    if (
        typeof title !== "string" ||
        typeof secret !== "string" ||
        !title.trim() ||
        !secret.trim()
    ) {
        return res.status(400).json({ error: "Title and Secret are required" })
    }

    try {
        const item = service.create({
            title: title.trim(),
            secret: secret.trim()
        })
        return res.status(201).json(item)
    } catch (err) {
        return res.status(500).json({ error: "Failed to create entry" })
    }
}

exports.list = (req, res) => {
    try {
        const data = service.list()
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ error: "Failed to list entries" })
    }
}

exports.remove = (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "ID is required" })
    }

    try {
        const removed = service.remove(id)

        if (!removed) {
            return res.status(404).json({ error: "Entry not found" })
        }

        return res.status(200).json({ message: "deleted" })
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete entry" })
    }
}