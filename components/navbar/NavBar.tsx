import { Avatar, Dropdown, Navbar, Switch, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { NavBarItems } from "./NavBarConstant";
import { RenderItemDesktop } from "./RenderItemDesktop";
import { RenderItemMobile } from "./RenderItemMobile";
import { useTheme as useNextTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export const NavBar = () => {
    const router = useRouter();

    const { isDark } = useTheme();
    const { setTheme } = useNextTheme();

    return (
        <Navbar isBordered variant="floating" css={{ zIndex: 1000 }}>
            <Navbar.Toggle showIn="xs" />
            <Navbar.Content
                hideIn="xs"
                enableCursorHighlight
                variant="underline"
            >
                <Dropdown isBordered>
                    <Dropdown.Trigger>
                        <Navbar.Item>
                            <Avatar
                                bordered
                                as="button"
                                color="primary"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </Navbar.Item>
                    </Dropdown.Trigger>
                    <Dropdown.Menu
                        variant="light"
                        onAction={(key) => router.push(key.toString())}
                    >
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {NavBarItems.map((item) => (
                    <Fragment key={item.path}>
                        <RenderItemDesktop item={item} />
                    </Fragment>
                ))}
                <Switch
                    checked={!isDark}
                    onChange={() => {
                        setTheme(isDark ? "light" : "dark");
                    }}
                    iconOn={<MdLightMode />}
                    iconOff={<MdDarkMode />}
                />
            </Navbar.Content>
            <Navbar.Collapse showIn="xs">
                {NavBarItems.map((item) => (
                    <Fragment key={item.path}>
                        <RenderItemMobile level={0} item={item} />
                    </Fragment>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
};
