import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();
app.use(express.json());

const PORT = 3001;
app.use(express.static("dist"));

app.get("/health", (_req, res) => {
  res.send("ok");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
