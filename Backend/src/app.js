import express from "express";
import cors from "cors";
import scoreRoutes from "./routes/scoreRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import winnerRoutes from "./routes/winnerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/winners", winnerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);




app.get("/", (req, res) => {
res.send("API Running...");
});

app.post("/test", (req, res) => {
console.log("TEST ROUTE HIT");

res.json({
message: "POST WORKING",
});
});

export default app;
