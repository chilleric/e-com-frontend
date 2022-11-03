import { Divider, Text } from "@nextui-org/react";
import { getListYear } from "./datePicker.inventory";

interface IYearModal {
    year: number;
    yearRange: number;
    setYear: Function;
    setYearRange: Function;
    setType: Function;
}

export const YearModal = ({
    year,
    setYear,
    setYearRange,
    yearRange,
    setType
}: IYearModal) => {
    return (
        <>
            <div
                style={{
                    height: 40,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}
            >
                <Text>prev</Text>
                <Text>
                    {yearRange} - {yearRange + 10}
                </Text>
                <Text>prev</Text>
            </div>

            <Divider />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    padding: 10
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: 40,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onMouseDown={() => {
                        setYear(yearRange - 1);
                    }}
                    key={yearRange - 1}
                >
                    {yearRange - 1}
                </div>
                {getListYear(yearRange).map((item) => (
                    <div
                        style={{
                            width: "100%",
                            height: 40,
                            paddingLeft: 10,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onMouseDown={() => {
                            setYear(item);
                            setType("month");
                        }}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
                <div
                    style={{
                        width: "100%",
                        height: 40,
                        paddingLeft: 10,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onMouseDown={() => {
                        setYear(yearRange + 11);
                    }}
                    key={yearRange + 11}
                >
                    {yearRange + 11}
                </div>
            </div>
        </>
    );
};
