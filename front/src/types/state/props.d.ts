// selector
type SelectorCallback = (id: string) => void;
type SelectorOption = {
    id: string,
    text: string,
}

export type SelectorProps = {
    name: string,
    label: string,
    options: SelectorOption[],
    selectCallback: SelectorCallback,
};