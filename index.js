//create express server
const express = require("express");
const cors = require("cors");
const {
  user_router,
  contact_router,
  subject_router,
  customer_router,
  profile_router,
} = require("./routes");

require("./models");

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", () => {
  console.log("server is running");
});

app.use("/users", user_router);
app.use("/contacts", contact_router);
app.use("/subjects", subject_router);
app.use("/customers", customer_router);
app.use("/profiles", profile_router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
