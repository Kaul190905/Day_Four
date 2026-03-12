const cryptoService = require("./services/cryptoService")
const mainService = require("./services/mainService")
const fs = require("fs")
const path = require("path")

// Set up a temporary data file for testing
const testDataPath = path.join(__dirname, "data", "data.json")
if (!fs.existsSync(path.dirname(testDataPath))) {
    fs.mkdirSync(path.dirname(testDataPath))
}

console.log("--- Starting Verification ---")

// 1. Test Encryption/Decryption
const secret = "my-super-secret-password"
const encrypted = cryptoService.encrypt(secret)
console.log("Encrypted:", encrypted)
const decrypted = cryptoService.decrypt(encrypted)
console.log("Decrypted:", decrypted)

if (secret === decrypted) {
    console.log("✅ Encryption/Decryption: SUCCESS")
} else {
    console.log("❌ Encryption/Decryption: FAILED")
}

// 2. Test Credential Creation
const testItem = { title: "Test Service", secret: "test-secret" }
const created = mainService.create(testItem)
console.log("Created Item:", created)

if (created.id && created.id.length === 36) { // UUID length
    console.log("✅ ID Generation (UUID): SUCCESS")
} else {
    console.log("❌ ID Generation (UUID): FAILED")
}

if (created.secret.includes(":")) {
    console.log("✅ Secure Encryption Format (IV:Data): SUCCESS")
} else {
    console.log("❌ Secure Encryption Format (IV:Data): FAILED")
}

// 3. Verify Persistence
const list = mainService.list()
const found = list.find(i => i.id === created.id)
if (found && found.title === testItem.title) {
    console.log("✅ Data Persistence: SUCCESS")
} else {
    console.log("❌ Data Persistence: FAILED")
}

// 4. Test Error Handling (Manual-like check)
try {
    const listBefore = mainService.list().length
    mainService.remove(created.id)
    const listAfter = mainService.list().length
    if (listBefore === listAfter + 1) {
        console.log("✅ Item Removal: SUCCESS")
    } else {
        console.log("❌ Item Removal: FAILED")
    }
} catch (e) {
    console.log("❌ Item Removal: ERROR", e)
}

console.log("--- Verification Complete ---")
