import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "health route is up and running",
  });
});

export default app;
