export interface SelectOption {
    label: string; 
    value: string | null; 
};

// TODO: Melhorar tipagens
export interface SelectProps {
    options: SelectOption[];
    value: string | null; 
    onChangeFn: (event: any) => void;
};