const express = require("express")
const path = require("path")
const app = express()
const mainRoutes = require("../routes/main")

app.use(express.json())
// Use absolute path for static files to avoid issues with different CWDs
app.use(express.static(path.join(__dirname, "..", "frontend")))

app.use("/api", mainRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})