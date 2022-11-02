import {
    bodyExample,
    CustomTable,
    DefaultLayout,
    headerExample,
    ltstACtionExample
} from "@/components";
import { ExampleRowType } from "@/types";
import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <DefaultLayout>
            Dashboard
            <CustomTable<ExampleRowType>
                header={headerExample}
                body={bodyExample}
                listActions={ltstACtionExample}
                selectionMode="multiple"
            >
                <></>
            </CustomTable>
        </DefaultLayout>
    );
};

export default Home;
