import {
  bodyExample,
  CustomTable,
  DefaultLayout,
  headerExample,
  ltstACtionExample,
} from "@/components";
import { ExampleRowType } from "@/types";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <CustomTable<ExampleRowType>
          header={headerExample}
          body={bodyExample}
          listActions={ltstACtionExample}
          selectionMode="multiple"
        >
          <></>
        </CustomTable>
        <CustomTable<ExampleRowType>
          header={headerExample}
          body={bodyExample}
          selectionMode="multiple"
        >
          <></>
        </CustomTable>
      </div>
    </DefaultLayout>
  );
};

export default Home;
