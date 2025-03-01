type PrimaryColorTokens =
	| 'PRIMARY_LIGHT_2'
	| 'PRIMARY_LIGHT_1'
	| 'PRIMARY_BASE'
	| 'PRIMARY_DARK_1'
	| 'PRIMARY_DARK_2'
	| 'PRIMARY_DARK_3';

type SecondaryColorTokens =
	| 'SECONDARY_LIGHT_2'
	| 'SECONDARY_LIGHT_1'
	| 'SECONDARY_BASE'
	| 'SECONDARY_DARK_1'
	| 'SECONDARY_DARK_2'
	| 'SECONDARY_DARK_3';

type NeutralColorTokens =
	| 'NEUTRAL_LIGHT_2'
	| 'NEUTRAL_LIGHT_1'
	| 'NEUTRAL_BASE'
	| 'NEUTRAL_DARK_1'
	| 'NEUTRAL_DARK_2'
	| 'NEUTRAL_DARK_3';

type PositiveAccentColorTokens =
	| 'ACCENT_POSITIVE_LIGHT_2'
	| 'ACCENT_POSITIVE_LIGHT_1'
	| 'ACCENT_POSITIVE_BASE'
	| 'ACCENT_POSITIVE_DARK_1'
	| 'ACCENT_POSITIVE_DARK_2'
	| 'ACCENT_POSITIVE_DARK_3';

type WarningAccentColorTokens =
	| 'ACCENT_WARNING_LIGHT_2'
	| 'ACCENT_WARNING_LIGHT_1'
	| 'ACCENT_WARNING_BASE'
	| 'ACCENT_WARNING_DARK_1'
	| 'ACCENT_WARNING_DARK_2'
	| 'ACCENT_WARNING_DARK_3';

type NegativeAccentColorTokens =
	| 'ACCENT_NEGATIVE_LIGHT_2'
	| 'ACCENT_NEGATIVE_LIGHT_1'
	| 'ACCENT_NEGATIVE_BASE'
	| 'ACCENT_NEGATIVE_DARK_1'
	| 'ACCENT_NEGATIVE_DARK_2'
	| 'ACCENT_NEGATIVE_DARK_3';

export type ColorTokens =
	| PrimaryColorTokens
	| SecondaryColorTokens
	| NeutralColorTokens
	| PositiveAccentColorTokens
	| WarningAccentColorTokens
	| NegativeAccentColorTokens;

export type FontFamilyTokens = 'PRIMARY' | 'SECONDARY';

export type FontSizeTokens =
	| 'BIGGER_6'
	| 'BIGGER_5'
	| 'BIGGER_4'
	| 'BIGGER_3'
	| 'BIGGER_2'
	| 'BIGGER_1'
	| 'BUTTON_DEFAULT'
	| 'BUTTON_SMALL'
	| 'BASE'
	| 'SMALLER_1'
	| 'SMALLER_2';

export type LineHeightTokens = 'BIG_FONT' | 'MEDIUM_FONT' | 'SMALL_FONT';
