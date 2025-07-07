import styles from "./DeliveryInfo.module.scss";

interface Props {
	rawHtml: string;
}

export default function DeliveryInfo({ rawHtml }: Props) {
	function parseHtml(raw: string): string {
		const withTags = raw
			.replace(/<delivery>/g, '<div class="delivery">')
			.replace(/<\/delivery>/g, "</div>")
			.replace(/<attention>/g, '<p class="attention">')
			.replace(/<\/attention>/g, "</p>");

		const linkified = withTags.replace(
			/(https?:\/\/[^\s<]+)/g,
			(url) =>
				`<a href="${url}" target="_blank" rel="noopener noreferrer" class="${styles.link}">${url}</a>`,
		);

		return linkified;
	}

	const parsedHtml = parseHtml(rawHtml);

	return (
		<div
			className={styles.deliveryInfo}
			dangerouslySetInnerHTML={{ __html: parsedHtml }}
		/>
	);
}
