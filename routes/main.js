const express=require("express")
const router=express.Router()
const controller=require("../controllers/mainController")

router.post("/create",controller.create)
router.get("/list",controller.list)
router.delete("/:id",controller.remove)

router.put("/:id",controller.update)
router.patch("/:id",controller.modify)

module.exports=router
