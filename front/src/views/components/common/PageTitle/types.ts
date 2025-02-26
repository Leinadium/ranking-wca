import type { TypographyProps } from "../Typography/types";

export interface PageTitleProps extends Pick<TypographyProps, 'align'> {
    text: string;
};