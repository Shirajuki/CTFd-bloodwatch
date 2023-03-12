import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";

let scoreboard = [];
let dev = process.env.DEV || false;
console.log("DEV MODE:", dev);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuring json response
app.set("json spaces", 2);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

const updateScoreboard = (socket) => {
	socket.emit("update-scoreboard", scoreboard);
};
updateScoreboard(io);

io.on("connection", (socket) => {
	console.log(`Socket ${socket.id} connected`);
	updateScoreboard(socket);
	socket.on("disconnect", () => {
		console.log("Socket disconnected");
	});
});

app.post("/scoreboard", (req, res) => {
	const { scoreboard: score } = req.body;
	scoreboard = score;
	updateScoreboard(io);
	res.json({ status: "ok" });
});

app.post("/blood", (req, res) => {
	const { team, challenge } = req.body;
	io.emit("blood", { team: team, challenge: challenge });
	updateScoreboard(io);
	res.json({ status: "ok" });
});

app.post("/pwn", (req, res) => {
	const { team, challenge } = req.body;
	io.emit("pwn", { team: team, challenge: challenge });
	updateScoreboard(io);
	res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
	console.log(`Listening on *:${PORT}`);
});
