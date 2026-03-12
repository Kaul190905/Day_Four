const express=require("express")
const router=express.Router()
const controller=require("../controllers/mainController")
const auth=require("../middleware/auth")

router.use(auth)

router.post("/create",controller.create)
router.get("/list",controller.list)
router.delete("/:id",controller.remove)

module.exports=router
