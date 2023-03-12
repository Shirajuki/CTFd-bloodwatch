import { useState, useEffect } from "preact/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useReward } from "react-rewards";
import io from "socket.io-client";

// Dah components
import Score from "./components/Score";
import Popup from "./components/Popup";

// Dah sfx
import ownage from "./ownage.mp3";
import blood from "./blood.mp3";
import pwn from "./pwn.mp3";

// Dah styling
import "./app.scss";

const useAudio = (url) => {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	const toggle = () => {
		audio.load();
		audio.play();
		setPlaying(true);
	};

	useEffect(() => {
		audio.addEventListener("ended", () => setPlaying(false));
		return () => audio.removeEventListener("ended", () => setPlaying(false));
	}, [setPlaying]);

	return [playing, toggle, audio];
};

const max = 12;
const colors = ["#f6dc43", "#bdcccc", "#a88834"];
const App = () => {
	const [socket, setSocket] = useState(null);
	const [scoreboard, setScoreboard] = useState([]);
	const [parent] = useAutoAnimate();
	const [scoreboard1] = useAutoAnimate();
	const [scoreboard2] = useAutoAnimate();
	const [playing1, toggle1, audio1] = useAudio(ownage);
	const [playing2, toggle2, audio2] = useAudio(blood);
	const [playing3, toggle3, audio3] = useAudio(pwn);
	const [bloodInfo, setBloodInfo] = useState({});
	const [ownageInfo, setOwnageInfo] = useState({});
	const [nums, setNums] = useState([]);
	const { reward, _isAnimating } = useReward("rewardId", "confetti", {
		elementCount: 100,
		startVelocity: 45,
		spread: 90,
		lifetime: 300,
		elementSize: 10,
	});

	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3000`);
		// const newSocket = io(`https://livescoreboard.ctf.itemize.no`);
		setSocket(newSocket);

		// Attach audio to window object
		window.audio1 = audio1;
		window.audio2 = audio2;
		window.audio3 = audio3;
		console.log("[DEBUG] Adjust sfx volume with `audio1.volume`");

		return () => newSocket.close();
	}, []);

	useEffect(() => {
		if (!socket) return;
		socket.on("update-scoreboard", (scoreboard) => {
			console.log("update", scoreboard);
			setScoreboard(scoreboard);
		});

		socket.on("pwn", (info) => {
			console.log("Pwn", info);
			setNums((nums) => [...nums, { ...info, type: "pwn" }]);
		});

		socket.on("blood", (info) => {
			console.log("Blood", info);
			setNums((nums) => [...nums, { ...info, type: "blood" }]);
		});

		socket.on("ownage", (info) => {
			console.log("Ownage", info);
			setNums((nums) => [...nums, { ...info, type: "ownage" }]);
		});

		return () => {
			socket.off("update-scoreboard");
			socket.off("pwn");
			socket.off("blood");
			socket.off("ownage");
		};
	}, [socket, setScoreboard, setNums]);

	// Play pwnage.mp3
	useEffect(() => {
		if (nums.length === 0 || playing3 || playing2 || playing1) return;
		if (!(nums[0].type === "pwn")) return;
		setNums((nums) => {
			if (nums.length >= 1 && !playing3) {
				reward();
				toggle3();
			}
			return nums.slice(1);
		});
	}, [playing3, playing2, playing1, nums, setNums]);

	// Play blood.mp3
	useEffect(() => {
		if (nums.length === 0 || playing2 || playing1) return;
		if (!(nums[0].type === "blood")) return;
		setNums((nums) => {
			if (nums.length >= 1 && !playing2) {
				reward();
				toggle2();
				setBloodInfo(nums[0]);
			}
			return nums.slice(1);
		});
	}, [playing2, playing1, nums, setNums]);

	// Play ownage.mp3
	useEffect(() => {
		if (nums.length === 0 || playing1) return;
		if (!(nums[0].type == "ownage")) return;
		setNums((nums) => {
			if (nums.length >= 1 && !playing1) {
				reward();
				toggle1();
				setOwnageInfo(nums[0]);
			}
			return nums.slice(1);
		});
	}, [playing1, nums, setNums]);

	return (
		<div>
			<h1>Scoreboard - S2G 2023</h1>
			<span id="rewardId" class="reward" />
			{playing1 && nums.length >= 0 && (
				<Popup
					color={colors}
					text={`${ownageInfo.team.name} solved all challenges!`}
					svg="cup"
				/>
			)}
			{playing2 && nums.length >= 0 && (
				<Popup
					color={"tomato"}
					text={`${bloodInfo?.team?.name || ""} first blooded "${
						bloodInfo?.challenge || ""
					}"!`}
					svg="blood"
				/>
			)}
			<div
				class={`scoreboard ${scoreboard.length > max ? "split" : ""}`}
				ref={parent}
			>
				<div ref={scoreboard1}>
					<Score user={{ name: "User", score: "Score", placement: "No" }} />
					{scoreboard.slice(0, max).map((user, placement) => (
						<Score user={{ ...user, placement: placement + 1 }} key={user.id} />
					))}
				</div>
				<div ref={scoreboard2} hidden={scoreboard.length <= max}>
					<Score user={{ name: "User", score: "Score", placement: "No" }} />
					{scoreboard.slice(max, max * 2).map((user, placement) => (
						<Score
							user={{ ...user, placement: placement + 1 + max }}
							key={user.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default App;
