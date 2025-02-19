const { Router } = require("express");
const { subject_controller } = require("../controllers");
const { route } = require("./contact");
const router = Router();

router.post("/", subject_controller.add_subject);
router.post("/assign/:user_id/:subject_id", subject_controller.assign_subject);
router.get("/", subject_controller.get_subjects);
router.get("/:id", subject_controller.get_subject);
router.delete("/:id", subject_controller.delete_subject);


module.exports = router;
