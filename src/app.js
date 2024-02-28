import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// when we use middlewares
app.use(
  express.json({
    limit: "16kb",
  })
);
// to take the data from url
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

//
app.use(express.static("public"));

app.use(cookieParser());

// routes  import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

export {app}
