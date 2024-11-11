export interface SelectOption {
    label: string; 
    value: string | null; 
};

export interface SelectProps {
    options: SelectOption[];
};