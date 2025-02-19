//create express server
const express = require("express");
const { user_router, contact_router, subject_router } = require("./routes");
require("./models");

const app = express();
const PORT = 3000;

app.use(express.json({ urlencoded: true }));
app.get("/", () => {
  console.log("server is running");
});

app.use("/user", user_router);
app.use("/contact", contact_router);
app.use("/subject", subject_router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
