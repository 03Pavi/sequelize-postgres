//create express server
const express = require("express");
const cors = require("cors");
const { user_router, contact_router, subject_router } = require("./routes");
require("./models");

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ urlencoded: true }));
app.get("/", () => {
  console.log("server is running");
});

app.use("/users", user_router);
app.use("/contact", contact_router);
app.use("/subjects", subject_router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
