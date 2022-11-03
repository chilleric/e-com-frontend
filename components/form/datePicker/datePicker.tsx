import { inputStylesUser } from "@/modules/user/inventory";
import { Input, Text, useTheme } from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { DayModal, MonthModal, YearModal } from "./inventory";

interface IDatePicker {
    value?: Date | string;
    onChange: Function;
    label: string;
}

export const DatePicker = ({ value, label, onChange }: IDatePicker) => {
    const nowDay = value ? dayjs(value) : dayjs();
    const [year, setYear] = useState(nowDay.year());
    const [month, setMonth] = useState(nowDay.month() + 1);
    const [day, setDay] = useState(nowDay.date());

    const [type, setType] = useState<"day" | "month" | "year" | "">("");
    const { theme } = useTheme();
    const divRef = useRef<HTMLDivElement>(null);

    const [yearRange, setYearRange] = useState(year - (year % 10));

    useEffect(() => {
        if (year - yearRange > 10) setYearRange(year - (year % 10));
    }, [year]);

    const dayString = year + "-" + month + "-" + day;

    return (
        <>
            <div
                onClick={() => setType("day")}
                ref={divRef}
                style={{ width: "100%", position: "relative" }}
            >
                <Text>{label}</Text>
                <div style={{ width: "100%", border: "1px solid" }}>
                    {dayString}
                </div>
                {type !== "" && (
                    <div
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        style={{
                            position: "absolute",
                            top: divRef?.current?.clientHeight,
                            left: 0,
                            width: 375,
                            backgroundColor: theme?.colors.white.value,
                            boxShadow: theme?.shadows.lg.value,
                            zIndex: 101,
                            borderRadius: 10
                        }}
                    >
                        {type === "year" && (
                            <YearModal
                                year={year}
                                yearRange={yearRange}
                                setYear={setYear}
                                setYearRange={setYearRange}
                                setType={setType}
                            />
                        )}
                        {type === "month" && (
                            <MonthModal
                                year={year}
                                setYear={setYear}
                                month={month}
                                setMonth={setMonth}
                                setType={setType}
                            />
                        )}
                        {type === "day" && (
                            <DayModal
                                year={year}
                                setYear={setYear}
                                month={month}
                                setMonth={setMonth}
                                setType={setType}
                                day={day}
                                setDay={setDay}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
