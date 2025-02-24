const router = require("express").Router();
const { profile_controller } = require("../controllers");

router.get("/", profile_controller.get_profiles);
router.get("/:id", profile_controller.get_profile);
router.put("/:id", profile_controller.update_profile);
router.post("/", profile_controller.add_profile);
router.delete("/:id", profile_controller.delete_profile);

module.exports = router;
