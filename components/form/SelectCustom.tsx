import { inputStylesUser } from "@/modules/user/inventory";
import { CSS, Input, useTheme } from "@nextui-org/react";
import { useRef, useState } from "react";

interface ISelectCustom {
    value: string | number;
    onChange: Function;
    label: string;
    disabled?: boolean;
    cssButon?: CSS;
    options: { value: string | number; label: string }[];
}

export const SelectCustom = ({
    value,
    onChange,
    label,
    disabled,
    cssButon,
    options
}: ISelectCustom) => {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();
    const divRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div ref={divRef} style={{ width: "100%", position: "relative" }}>
            <Input
                css={{ ...cssButon, width: "100%" }}
                value={options.find((item) => item.value === value)?.label}
                label={label}
                readOnly={disabled}
                onFocus={handleOpen}
                onBlur={handleClose}
                {...inputStylesUser({})}
            />
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: divRef?.current?.clientHeight,
                        left: 0,
                        right: 0,
                        backgroundColor: theme?.colors.white.value,
                        boxShadow: theme?.shadows.lg.value,
                        zIndex: 10,
                        borderRadius: 10
                    }}
                >
                    {options.map(({ value, label }) => (
                        <div
                            style={{
                                width: "100%",
                                height: 40,
                                paddingLeft: 10,
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                cursor: "pointer"
                            }}
                            onMouseDown={() => {
                                console.log(value);
                                onChange(value);
                            }}
                            key={value}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
