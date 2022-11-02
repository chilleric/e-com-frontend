export type HeaderTableType = {
    key: string;
    name: string;
};

export type ActionType = {
    content: string;
    icon: React.ReactNode;
    func: Function;
};

export type ExampleRowType = {
    id: string;
    name: string;
    role: string;
    status: string;
};
