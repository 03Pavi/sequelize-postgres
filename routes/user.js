const { Router } = require("express");
const { user_controller } = require("../controllers");
const router = Router();




// scopes
router.get("/scope", user_controller.scope);
router.get("/transaction",user_controller.transaction)


router.get("/", user_controller.get_users);
router.get("/subjects", user_controller.get_subjects);
router.get("/creating_associations", user_controller.creating_associations);
router.get("/eager-loading/contact", user_controller.eager_loading_contacts);
router.get("/advance-eager-loading/contact", user_controller.advance_eager_loading_contacts);
router.get("/lazy-loading/contact", user_controller.lazy_loading_contacts);
router.get("/restore", user_controller.restore_user);
router.get("/:id", user_controller.get_user);
router.post("/", user_controller.add_user);
router.delete("/:id", user_controller.delete_user);
router.put("/:id", user_controller.update_user);


module.exports = router;
