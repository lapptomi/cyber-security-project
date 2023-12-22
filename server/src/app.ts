import express, { Express } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";
import { PORT } from "./utils/constants";
import { scuffedErrorHandler } from "./utils/errorhandler";

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);
app.use(scuffedErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
