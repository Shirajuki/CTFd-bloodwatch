const Popup = ({ color, text, svg }) => {
	return (
		<div class={`popup ${svg}`} style={`--color: ${color};`}>
			{svg == "cup" && (
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 64 64"
					enable-background="new 0 0 64 64"
				>
					<g id="Layer_1">
						<g>
							<circle class="st0" cx="32" cy="32" r="32" />
						</g>
						<g class="st1">
							<path
								class="st2"
								d="M48,52c0,1.1-0.9,2-2,2H18c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h28C47.1,50,48,50.9,48,52L48,52z"
							/>
						</g>
						<g>
							<path
								class="st3"
								d="M36,45c0,1.7-1.3,3-3,3h-2c-1.7,0-3-1.3-3-3V35c0-1.7,1.3-3,3-3h2c1.7,0,3,1.3,3,3V45z"
							/>
						</g>
						<g class="st1">
							<g>
								<path
									class="st2"
									d="M41,34c-1.1,0-2-0.9-2-2s0.9-2,2-2c3.2,0,7-5.5,7-8.9c0-2.7,0-3.1-4-3.1H20c-4,0-4,0.3-4,3.1
				c0,3.4,3.8,8.9,7,8.9c1.1,0,2,0.9,2,2s-0.9,2-2,2c-5.6,0-11-7.4-11-12.9c0-6.5,3.8-7.1,8-7.1h24c4.2,0,8,0.5,8,7.1
				C52,26.6,46.6,34,41,34z"
								/>
							</g>
						</g>
						<g>
							<path
								class="st3"
								d="M41,32c-1.1,0-2-0.9-2-2s0.9-2,2-2c3.2,0,7-5.5,7-8.9c0-2.7,0-3.1-4-3.1H20c-4,0-4,0.3-4,3.1
			c0,3.4,3.8,8.9,7,8.9c1.1,0,2,0.9,2,2s-0.9,2-2,2c-5.6,0-11-7.4-11-12.9c0-6.5,3.8-7.1,8-7.1h24c4.2,0,8,0.5,8,7.1
			C52,24.6,46.6,32,41,32z"
							/>
						</g>
						<g>
							<path
								class="st4"
								d="M18,12c0.6,19.9,8.4,24,14,24s13.3-4.1,14-24H18z"
							/>
						</g>
						<g>
							<path
								class="st4"
								d="M43.7,50.3c-1.2-3.6-6-6.3-11.7-6.3s-10.5,2.7-11.7,6.3H43.7z"
							/>
						</g>
						<g>
							<path
								class="st5"
								d="M48,50c0,1.1-0.9,2-2,2H18c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h28C47.1,48,48,48.9,48,50L48,50z"
							/>
						</g>
						<g class="st1">
							<path
								class="st2"
								d="M38,42c0,1.1-0.9,2-2,2h-8c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h8C37.1,40,38,40.9,38,42L38,42z"
							/>
						</g>
						<g>
							<path
								class="st4"
								d="M38,40c0,1.1-0.9,2-2,2h-8c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h8C37.1,38,38,38.9,38,40L38,40z"
							/>
						</g>
						<g class="st1">
							<path
								class="st2"
								d="M48,16c0,1.1-0.9,2-2,2H18c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h28C47.1,14,48,14.9,48,16L48,16z"
							/>
						</g>
						<g>
							<path
								class="st4"
								d="M48,14c0,1.1-0.9,2-2,2H18c-1.1,0-2-0.9-2-2l0,0c0-1.1,0.9-2,2-2h28C47.1,12,48,12.9,48,14L48,14z"
							/>
						</g>
					</g>
					<g id="Layer_2"></g>
				</svg>
			)}
			{svg == "blood" && (
				<svg viewBox="0 0 57 64" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_726_2)">
						<path
							d="M28.1733 3.69436C30.6233 15.5964 35.1033 21.3444 40.8613 29.0534C42.8531 31.7204 44.0801 34.9526 44.0801 38.5378C44.0801 47.3045 36.9406 54.4128 28.1741 54.4128C19.4074 54.4128 12.3301 47.3045 12.3301 38.5378C12.3301 35 13.4246 31.6363 15.4551 29.0534C21.4641 21.4084 25.8621 15.6294 28.1731 3.69336L28.1733 3.69436Z"
							fill="#DC4640"
						/>
						<path
							d="M42.7121 2.0752C45.4838 7.64901 48.4271 9.91086 52.2527 12.977C53.5761 14.0378 54.6022 15.4782 55.0779 17.2535C56.241 21.5944 53.7088 26.0453 49.4416 27.1887C45.1743 28.3321 40.7862 25.7355 39.623 21.3946C39.1537 19.6428 39.2401 17.8345 39.8858 16.2907C41.7965 11.7215 43.1705 8.28635 42.7118 2.07473L42.7121 2.0752Z"
							fill="#DC4640"
						/>
						<path
							d="M13.7118 3.0669C13.3252 9.27981 14.7433 12.7103 16.5233 17.2785C17.139 18.8588 17.3074 20.6193 16.8318 22.3946C15.6686 26.7355 11.2503 29.324 6.98302 28.1806C2.71569 27.0372 0.213812 22.5943 1.37695 18.2535C1.84634 16.5017 2.82539 14.9789 4.15646 13.9648C8.09575 10.963 11.0033 8.67515 13.7118 3.06638L13.7118 3.0669Z"
							fill="#DC4640"
						/>
					</g>
					<defs>
						<clipPath id="clip0_726_2">
							<rect width="57" height="64" fill="white" />
						</clipPath>
					</defs>
				</svg>
			)}
			<h1>{text}</h1>
		</div>
	);
};
export default Popup;
