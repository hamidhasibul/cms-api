import express, { Application } from "express";
import * as path from "path";
import cors from "cors";
import "module-alias/register";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import "dotenv/config";

import { errorHandler } from "./middlewares/error-handler";
import { logger } from "./middlewares/log-events";
import { credentials } from "./middlewares/credentials";

import { corsOptions } from "./configs/cors-options";

import routes from "./routes/index";

const PORT: number = Number(process.env.PORT) || 5000;
const app: Application = express();

// Middlewares

app.use(express.static(path.join(process.cwd(), "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(cookieParser());

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

// Routes
app.get("/test", (req, res) => {
  res.json({ message: "hello from the server-side" });
});

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server initialized @http://localhost:${PORT}/`);
});
