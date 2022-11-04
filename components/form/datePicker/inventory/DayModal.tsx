import { Divider, Text, useTheme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getDayString, getListDay } from "./DatePicker.inventory";

interface IDayModal {
    month: number;
    setMonth: Function;
    setType: Function;
    year: number;
    setYear: Function;
    day: number;
    setDay: Function;
    onChange: Function;
}

export const DayModal = ({
    setMonth,
    month,
    setType,
    setYear,
    year,
    day,
    setDay,
    onChange
}: IDayModal) => {
    const [listDay, setListDay] = useState<number[]>(getListDay(month, year));
    const { theme } = useTheme();
    const [hoverItem, setHoverItem] = useState(-1);

    useEffect(() => {
        setListDay(getListDay(month, year));
    }, [month, year]);

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
                        setMonth(month - 1);
                    }}
                >
                    {"<"}
                </Text>
                <Text
                    css={{ cursor: "pointer" }}
                    onClick={() => {
                        setType("month");
                    }}
                >
                    {month}
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
                        setMonth(month + 1);
                    }}
                >
                    {">"}
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
                    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                    padding: 10
                }}
            >
                {listDay.map((item) => (
                    <div
                        style={{
                            width: "100%",
                            height: 40,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor:
                                item === day
                                    ? theme?.colors.blue400.value
                                    : hoverItem === item
                                    ? theme?.colors.blue200.value
                                    : ""
                        }}
                        onMouseMove={() => setHoverItem(item)}
                        onMouseOut={() => setHoverItem(-1)}
                        onMouseDown={() => {
                            setDay(item);
                            setType("");
                            onChange(getDayString(item, month, year));
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
