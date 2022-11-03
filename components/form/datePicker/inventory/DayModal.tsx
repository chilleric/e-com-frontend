import { Divider, Text, theme } from "@nextui-org/react";
import { getListDay } from "./datePicker.inventory";

interface IDayModal {
    month: number;
    setMonth: Function;
    setType: Function;
    year: number;
    setYear: Function;
    day: number;
    setDay: Function;
}

export const DayModal = ({
    setMonth,
    month,
    setType,
    setYear,
    year,
    day,
    setDay
}: IDayModal) => {
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
                    prevprev
                </Text>
                <Text
                    onClick={() => {
                        setMonth((prev: number) => prev - 1);
                    }}
                >
                    prev
                </Text>
                <Text
                    onClick={() => {
                        setType("month");
                    }}
                >
                    {month}
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
                        setMonth((prev: number) => prev + 1);
                    }}
                >
                    next
                </Text>
                <Text
                    onClick={() => {
                        setYear((prev: number) => prev + 1);
                    }}
                >
                    nextnext
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
                {getListDay(month, year).map((item) => (
                    <div
                        style={{
                            width: "100%",
                            height: 40,
                            paddingLeft: 10,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                                item === day ? theme.colors.blue300.value : ""
                        }}
                        onMouseDown={() => {
                            setDay(item);
                            setType("");
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
