import { Divider, Text, useTheme } from "@nextui-org/react";
import { useState } from "react";
import { getListMonth } from "./DatePicker.inventory";

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
    const { theme } = useTheme();
    const [hoverItem, setHoverItem] = useState(-1);

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
                    css={{ cursor: "pointer" }}
                    onClick={() => {
                        setYear(year - 1);
                    }}
                >
                    {"<<"}
                </Text>
                <Text
                    css={{ cursor: "pointer" }}
                    onClick={() => {
                        setType("year");
                    }}
                >
                    {year}
                </Text>
                <Text
                    css={{ cursor: "pointer" }}
                    onClick={() => {
                        setYear(year + 1);
                    }}
                >
                    {">>"}
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
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                                item === month
                                    ? theme?.colors.blue400.value
                                    : hoverItem === item
                                    ? theme?.colors.blue200.value
                                    : ""
                        }}
                        onMouseMove={() => setHoverItem(item)}
                        onMouseOut={() => setHoverItem(-1)}
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
