import type { TypographyProps } from '../../Typography/types';
import type { ButtonRootSizes } from '../Root/types';

export interface ButtonTextProps extends Omit<TypographyProps, 'type'> {
	size?: ButtonRootSizes;
}
