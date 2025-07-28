import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface DigisellerChatProps {
	sellerId: number | string;
	height?: number;
	width?: string;
	isOpen: boolean;
	onClose?: () => void;
}

const DigisellerChat: React.FC<DigisellerChatProps> = ({
	sellerId,
	height = 500,
	width = "800px",
	isOpen,
	onClose,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const container = document.createElement("div");
		document.body.appendChild(container);
		containerRef.current = container;
		setMounted(true);

		return () => {
			if (containerRef.current) {
				document.body.removeChild(containerRef.current);
			}
		};
	}, []);

	if (!mounted || !isOpen || !containerRef.current) return null;

	const iframeSrc = `https://chat.digiseller.ru/asp/start.asp?fr=g&user=${sellerId}&service=1&shop=0&lang=ru-RU`;

	return ReactDOM.createPortal(
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				backgroundColor: "rgba(0, 0, 0, 0.6)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 9999,
			}}
			onClick={onClose}
		>
			<div
				style={{
					width,
					height,
					backgroundColor: "#fff",
					boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
					borderRadius: "8px",
					overflow: "hidden",
					position: "relative",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<iframe
					src={iframeSrc}
					width="100%"
					height="100%"
					frameBorder={0}
					style={{ border: "none" }}
					title="Чат с продавцом Digiseller"
				/>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: 8,
						right: 8,
						background: "transparent",
						border: "none",
						fontSize: "20px",
						cursor: "pointer",
						color: "#888",
					}}
				>
					×
				</button>
			</div>
		</div>,
		containerRef.current,
	);
};

export default DigisellerChat;
