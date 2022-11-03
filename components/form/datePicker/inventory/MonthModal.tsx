import { Divider, Text } from "@nextui-org/react";
import { getListMonth } from "./datePicker.inventory";

interface IMonthModal {
    month: number;
    setMonth: Function;
    setType: Function;
    year: number;
    setYear: Function;
}

export const MonthModal = ({
    setMonth,
    month,
    setType,
    setYear,
    year
}: IMonthModal) => {
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
                <Text
                    onClick={() => {
                        setYear((prev: number) => prev - 1);
                    }}
                >
                    prev
                </Text>
                <Text
                    onClick={() => {
                        setType("year");
                    }}
                >
                    {year}
                </Text>
                <Text
                    onClick={() => {
                        setYear((prev: number) => prev + 1);
                    }}
                >
                    prev
                </Text>
            </div>

            <Divider />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    padding: 10
                }}
            >
                {getListMonth().map((item) => (
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
                            setMonth(item);
                            setType("day");
                        }}
                        key={item}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </>
    );
};
