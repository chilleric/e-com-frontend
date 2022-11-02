import { useTheme } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    const { isDark } = useTheme();

    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                width: "100vw"
            }}
        >
            {isDark ? (
                <Image
                    src="/background/darkBack.jpg"
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                />
            ) : (
                <Image
                    src="/background/lightBack.jpg"
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                />
            )}
            {children}
        </div>
    );
};
