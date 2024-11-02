// selector
type SelectorCallback = (id: string) => void;
type SelectorOption = {
    id: string,
    text: string,
    flagId: string | null,
}

export type SelectorProps = {
    name: string,
    options: SelectorOption[],
    selectCallback: SelectorCallback,
};