const crypto=require("crypto")
require("dotenv").config()

const ALGORITHM = "aes-256-cbc"
const KEY = Buffer.from(process.env.ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef", "utf8")

exports.encrypt=function(text){
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return iv.toString("hex") + ":" + encrypted
}

exports.decrypt=function(encryptedText){
    try {
        const [ivHex, data] = encryptedText.split(":")
        if (!ivHex || !data) return "ERROR: Invalid encrypted format"
        const iv = Buffer.from(ivHex, "hex")
        const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
        let decrypted = decipher.update(data, "hex", "utf8")
        decrypted += decipher.final("utf8")
        return decrypted
    } catch (e) {
        return "ERROR: Decryption failed"
    }
}