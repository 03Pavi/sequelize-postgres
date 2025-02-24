const router = require("express").Router();
const { customer_controller } = require("../controllers");

router.get("/", customer_controller.get_customers);
router.get("/:id", customer_controller.get_customer);
router.post("/", customer_controller.add_customer);
router.put("/:id", customer_controller.update_customer);

module.exports = router;
