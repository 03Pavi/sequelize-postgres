const { Router } = require("express");
const { user_controller } = require("../controllers");
const router = Router();

router.get("/:id", user_controller.get_user);
router.post("/", user_controller.add_user);
router.get("/", user_controller.get_users);
router.delete('/:id',user_controller.delete_user);
router.put('/:id',user_controller.update_user);

module.exports = router;
