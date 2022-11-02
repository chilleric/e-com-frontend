import { ActionType, ExampleRowType, HeaderTableType } from "@/types";
import { Router } from "next/router";
import { AiOutlineEdit } from "react-icons/ai";

export const headerExample: HeaderTableType[] = [
    {
        key: "actions",
        name: ""
    },
    {
        key: "name",
        name: "NAME"
    },
    {
        key: "status",
        name: "STATUS"
    },
    {
        key: "role",
        name: "ROLE"
    }
];
export const bodyExample: ExampleRowType[] = [
    {
        id: "test1",
        name: "Tony Reichert",
        role: "CEO",
        status: "Active"
    },
    {
        id: "test2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: "Paused"
    },
    {
        id: "test3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active"
    },
    {
        id: "test4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation"
    }
];

export const ltstACtionExample: ActionType[] = [
    {
        content: "test",
        icon: <AiOutlineEdit size={20} fill="#979797" />,
        func: (id: string, router: Router) => {
            router.push(`/notfount/${id}`);
        }
    }
];
