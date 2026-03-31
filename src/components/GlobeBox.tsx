import { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import { globeBoxStyles, globeBoxClasses } from "./GlobeBox.styles";

type GlobeBoxProps = {
	label?: string;
	footerTexts?: string[];
	footerSwitchMs?: number;
	className?: string;
	style?: React.CSSProperties;
};

type Marker = {
	latitude: number;
	longitude: number;
};

const markers: Marker[] = [
	{ latitude: 31.22, longitude: 121.4737 },
	{ latitude: 35.6895, longitude: 139.6917 },
	{ latitude: 1.312083, longitude: 103.8198 },
	{ latitude: -33.86, longitude: 151.20889 },
	{ latitude: 37.75, longitude: -122.2833 },
	{ latitude: 40.7143, longitude: -74.006 },
	{ latitude: 49.26123, longitude: -123.11487 },
];

const defaultFooterTexts = [
	"New York",
	"Tokyo",
	"Singapore",
	"Sydney",
	"San Francisco",
	"Vancouver",
	"Shanghai",
];

export default function GlobeBox({
	label = "Worldspan",
	footerTexts,
	footerSwitchMs = 2800,
	className,
	style,
}: GlobeBoxProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const pointerInteracting = useRef<number | null>(null);
	const pointerInteractionMovement = useRef(0);
	const [footerIndex, setFooterIndex] = useState(0);
	const [isFooterVisible, setIsFooterVisible] = useState(true);

	const resolvedFooterTexts = useMemo(() => {
		return footerTexts && footerTexts.length > 0 ? footerTexts : defaultFooterTexts;
	}, [footerTexts]);

	useEffect(() => {
		let phi = 0.09;
		let width = 0;

		if (!canvasRef.current) return;

		const onResize = () => {
			if (canvasRef.current) {
				width = canvasRef.current.offsetWidth;
			}
		};

		const resizeObserver = new ResizeObserver(onResize);
		resizeObserver.observe(canvasRef.current);
		onResize();

		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi,
			theta: 0.06,
			dark: 1,
			diffuse: 1.32,
			mapSamples: 10877,
			mapBrightness: 12,
			baseColor: [0.2, 0.2, 0.2],
			glowColor: [1, 1, 1],
			markerColor: [1, 1, 1],
			markers: markers.map((marker) => ({
				location: [marker.latitude, marker.longitude],
				size: 0.12,
			})),
			scale: 0.875,
			offset: [0, 0],
			onRender: (state) => {
				state.width = width * 2;
				state.height = width * 2;
				state.phi = phi + pointerInteractionMovement.current;
				phi += 0.4 / 200;
			},
		});

		return () => {
			resizeObserver.disconnect();
			globe.destroy();
		};
	}, []);

	useEffect(() => {
		if (resolvedFooterTexts.length <= 1) {
			setFooterIndex(0);
			setIsFooterVisible(true);
			return;
		}

		let isActive = true;
		let timeoutId: number | undefined;
		const intervalId = window.setInterval(() => {
			setIsFooterVisible(false);
			timeoutId = window.setTimeout(() => {
				if (!isActive) return;
				setFooterIndex((current) => {
					return (current + 1) % resolvedFooterTexts.length;
				});
				setIsFooterVisible(true);
			}, 220);
		}, footerSwitchMs);

		return () => {
			isActive = false;
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}
			window.clearInterval(intervalId);
		};
	}, [footerSwitchMs, resolvedFooterTexts]);

	return (
		<div className={`globe-box${className ? ` ${className}` : ""}`} style={{ ...globeBoxStyles.box, ...style }}>
			<div className={"globe-box__globe-container"} style={globeBoxStyles.globeContainer}>
				<div style={globeBoxStyles.globeMask}>
					<canvas
						ref={canvasRef}
						style={globeBoxStyles.globeCanvas}
						onPointerDown={(event) => {
							pointerInteracting.current =
								event.clientX - pointerInteractionMovement.current;
							event.currentTarget.style.cursor = "grabbing";
						}}
						onPointerUp={(event) => {
							pointerInteracting.current = null;
							event.currentTarget.style.cursor = "grab";
						}}
						onPointerOver={(event) => {
							event.currentTarget.style.cursor = "grab";
						}}
						onPointerOut={(event) => {
							pointerInteracting.current = null;
							event.currentTarget.style.cursor = "auto";
						}}
						onMouseMove={(event) => {
							if (pointerInteracting.current !== null) {
								const delta = event.clientX - pointerInteracting.current;
								pointerInteractionMovement.current = delta / 100;
							}
						}}
						onTouchMove={(event) => {
							if (pointerInteracting.current !== null && event.touches[0]) {
								const delta =
									event.touches[0].clientX - pointerInteracting.current;
								pointerInteractionMovement.current = delta / 100;
							}
						}}
					/>
				</div>
			</div>
			<div className={globeBoxClasses.label} style={globeBoxStyles.label}>
				{label}
			</div>
			<div className={globeBoxClasses.footer} style={globeBoxStyles.footer}>
				<div
					className={globeBoxClasses.footerText}
					style={{
						...globeBoxStyles.footerText,
						opacity: isFooterVisible ? 1 : 0,
						transform: isFooterVisible ? "translateY(0)" : "translateY(4px)",
					}}
				>
					{resolvedFooterTexts[footerIndex]}
				</div>
			</div>
		</div>
	);
}
