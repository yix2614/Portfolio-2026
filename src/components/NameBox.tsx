import * as React from "react";
import { nameBoxStyles, nameBoxClasses } from "./NameBox.styles";

export default function NameBox() {
	// Simplified image handling
	const imageSources = [
		"https://framerusercontent.com/images/nVfg0wCczUhY25El2mKQ089ml4.png?scale-down-to=512",
		"https://framerusercontent.com/images/sOByZuE8rzv585dBkDeRRD3VrjU.png?scale-down-to=512",
		"https://framerusercontent.com/images/nObtdjVkEGRQitxzJa2fAiiQWG4.png",
		"https://framerusercontent.com/images/06WZmP1XWROpiKFsq42ccuj9Uc.jpeg?scale-down-to=512",
		"https://framerusercontent.com/images/7kh9I7Oz2smXPOduG5kIrQez9Jo.jpg?scale-down-to=512",
		"https://framerusercontent.com/images/pYGWMum5kjSZ8FaqC6x6Zq3c5OQ.jpg?scale-down-to=512",
	];

	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

	React.useEffect(() => {
		// 只要有图片就开始计时器，哪怕只有一张（虽然只有一张时切换没意义，但逻辑上是运行的）
		// 为了避免不必要的定时器，还是保留长度检查，但现在数组里已经有两张图了。
		if (imageSources.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
		}, 3000); // 每 3 秒切换一次

		return () => clearInterval(interval);
	}, [imageSources.length]);

	return (
		<div
			className="namebox-container"
			data-component="NameBox"
			style={nameBoxStyles.box as React.CSSProperties}
		>
			<div
				className={nameBoxClasses.moodboardText}
				style={nameBoxStyles.moodboardText as React.CSSProperties}
			>
				<p dir="auto" className={nameBoxClasses.moodboardP} style={nameBoxStyles.moodboardP as React.CSSProperties}>
					{"Moodboard"}
				</p>
			</div>
			<div
				className="bottom-container"
				style={nameBoxStyles.bottomContainer as React.CSSProperties}
			>
				<div
					className="separator"
					style={nameBoxStyles.separator as React.CSSProperties}
				/>
				<div
					className="tags-container"
					style={nameBoxStyles.tagsContainer as React.CSSProperties}
				>
					{[
						"UI/UX",
						"Design Engineer",
						"Speculative Design",
						"Branding",
						"Product Manage",
						"Web design",
					].map((text, index) => (
						<div
							key={index}
							className={`tag-item tag-${index}`}
							style={nameBoxStyles.tag as React.CSSProperties}
						>
							<div
								className="tag-text-wrapper"
								style={nameBoxStyles.tagTextWrapper as React.CSSProperties}
							>
								<p dir="auto" style={nameBoxStyles.tagP as React.CSSProperties}>
									{text}
								</p>
							</div>
						</div>
					))}
				</div>
				<div
					className="spacer"
					style={nameBoxStyles.spacer as React.CSSProperties}
				/>
			</div>
			<div
				className="yixiang-text"
				style={{
					...(nameBoxStyles.yixiangText as React.CSSProperties),
				}}
			>
				<svg width="100%" height="100%" viewBox="0 0 800 250" preserveAspectRatio="xMidYMid meet">
					<text
						x="50%"
						y="50%"
						textAnchor="middle"
						dominantBaseline="middle"
						style={{
							fontFamily:
								'"DT Random Display Regular", "DT Random Display Regular Placeholder", sans-serif',
							fontSize: "200px",
							letterSpacing: "-0.07px",
							fill: "currentColor",
						}}
					>
						yixiang
					</text>
				</svg>
			</div>
			<div
				className={nameBoxClasses.xIconContainer}
				style={nameBoxStyles.xIconContainer as React.CSSProperties}
			>
				<div
					className="left-parenthesis"
					style={nameBoxStyles.parenthesisText as React.CSSProperties}
				>
					<svg
						height="100%"
						viewBox="0 0 40 100"
						// preserveAspectRatio="none" // Removed
						style={{ display: "block", overflow: "visible" }}
					>
						<text
							x="50%"
							y="50%" // Centered vertically
							dominantBaseline="middle"
							textAnchor="middle"
							fill="currentColor"
							style={{
								fontFamily:
									'"Helvetica Neue Medium", "Helvetica Neue Medium Placeholder", sans-serif',
								fontSize: "100px", // 在 viewBox 内部的大小
								fontWeight: 500,
								letterSpacing: "-0.07px",
							}}
						>
							(
						</text>
					</svg>
				</div>
				<div
					className={nameBoxClasses.xIconWrapper}
					style={nameBoxStyles.xIcon as React.CSSProperties}
				>
					<div style={nameBoxStyles.imageWrapper as React.CSSProperties}>
						<img
							src={imageSources[currentImageIndex]}
							alt=""
							style={nameBoxStyles.image as React.CSSProperties}
						/>
					</div>
				</div>
				<div
					className="right-parenthesis"
					style={nameBoxStyles.parenthesisText as React.CSSProperties}
				>
					<svg
						height="100%"
						viewBox="0 0 40 100"
						// preserveAspectRatio="none" // Removed to prevent stretching
						style={{ display: "block", overflow: "visible" }}
					>
						<text
							x="50%"
							y="50%"
							dominantBaseline="middle"
							textAnchor="middle"
							fill="currentColor"
							style={{
								fontFamily:
									'"Helvetica Neue Medium", "Helvetica Neue Medium Placeholder", sans-serif',
								fontSize: "100px",
								fontWeight: 500,
								letterSpacing: "-0.07px",
							}}
						>
							)
						</text>
					</svg>
				</div>
			</div>
			<div
				className="love-crafting-text"
				style={nameBoxStyles.loveCraftingText as React.CSSProperties}
			>
				<p
					dir="auto"
					style={nameBoxStyles.loveCraftingP as React.CSSProperties}
				>
					{"Love crafting, "}
				</p>
				<p
					dir="auto"
					style={nameBoxStyles.loveCraftingP as React.CSSProperties}
				>
					{"but crave creating even more."}
				</p>
			</div>
		</div>
	);
}
