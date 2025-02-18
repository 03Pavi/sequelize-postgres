const { Router } = require("express");
const { contact_controller } = require("../controllers");
const router = Router();

router.post("/:user_id", contact_controller.add_contact);
router.get("/", contact_controller.get_contact);


module.exports = router;
