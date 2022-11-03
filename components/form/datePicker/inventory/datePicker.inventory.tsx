import dayjs from "dayjs";

export const getListYear = (year: number) => {
    const listYear = new Array(10).fill(null).map((value, index) => {
        return year + index;
    });
    return listYear;
};

export const getListMonth = () => {
    const listMonth = new Array(12).fill(null).map((value, index) => {
        return index + 1;
    });
    return listMonth;
};

export const getListDay = (month: number, year: number) => {
    const days = dayjs(
        1 + "-" + month + "-" + year,
        "MM-DD-YYYY"
    ).daysInMonth();

    const listDay = new Array(days).fill(null).map((value, index) => {
        return index + 1;
    });

    return listDay;
};
