type ModalSizes = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface ModalProps {
	children?: any; // TODO: Melhorar tipagem
	size?: ModalSizes;
	title: string;
	actionText: string;
	actionFn: () => void;
	isActionDisabled?: boolean;
}
