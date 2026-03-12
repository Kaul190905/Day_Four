const crypto = require("crypto")
require("dotenv").config()

const ALGORITHM = "aes-256-cbc"
const KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32)

exports.encrypt = function (text) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return `${iv.toString("hex")}:${encrypted}`
}

exports.decrypt = function (encryptedText) {
    try {
        const parts = encryptedText.split(":")
        if (parts.length !== 2) return null
        const iv = Buffer.from(parts[0], "hex")
        const encryptedData = parts[1]
        const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
        let decrypted = decipher.update(encryptedData, "hex", "utf8")
        decrypted += decipher.final("utf8")
        return decrypted
    } catch (err) {
        return null
    }
}