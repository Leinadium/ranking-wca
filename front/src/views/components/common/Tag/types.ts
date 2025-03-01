export interface TagProps {
	text: string | number;
	color?: 'PRIMARY' | 'SECONDARY' | 'NEUTRAL' | 'POSITIVE' | 'WARNING' | 'NEGATIVE';
	align?: 'left' | 'right' | 'center';
	isFullWidth?: boolean;
}
