import { DatePicker, SelectCustom } from "@/components";
import { genderList } from "@/lib";
import { UserDetailFailure, UserResponseSuccess } from "@/types";
import {
    Container,
    Grid,
    Input,
    Switch,
    Text,
    useTheme
} from "@nextui-org/react";
import dayjs from "dayjs";
import { inputStylesUser } from "./User.inventory";

interface IUserForm {
    user: UserResponseSuccess;
    type: "read" | "create" | "update";
    onchangeUserState: Function;
    errorState?: UserDetailFailure;
}

export const UserForm = ({
    user,
    onchangeUserState,
    type,
    errorState
}: IUserForm) => {
    return (
        <>
            <Grid.Container gap={4} justify="center">
                {type !== "create" && (
                    <Grid xs={12}>
                        <Container
                            css={{ display: "flex", gap: 50, padding: 0 }}
                        >
                            <Text>verified</Text>
                            <Switch checked={user.verified} disabled />
                            <Text>verify2FA</Text>
                            <Switch checked={user.verify2FA} disabled />
                        </Container>
                    </Grid>
                )}
                <Grid xs={6}>
                    <Input
                        css={{ width: "100%" }}
                        value={user.username}
                        label={"username"}
                        readOnly={type === "create" ? false : true}
                        onChange={(event) => {
                            onchangeUserState({
                                username: event.currentTarget.value
                            });
                        }}
                        {...inputStylesUser({ error: errorState?.username })}
                    />
                </Grid>
                <Grid xs={6}>
                    <Input
                        css={{ width: "100%" }}
                        value={user.address}
                        label={"address"}
                        readOnly={type === "read" ? true : false}
                        onChange={(event) => {
                            onchangeUserState({
                                address: event.currentTarget.value
                            });
                        }}
                        {...inputStylesUser({ error: errorState?.address })}
                    />
                </Grid>
                <Grid xs={6}>
                    <Input
                        css={{ width: "100%" }}
                        value={user.firstName}
                        label={"first name"}
                        readOnly={type === "read" ? true : false}
                        onChange={(event) => {
                            onchangeUserState({
                                firstName: event.currentTarget.value
                            });
                        }}
                        {...inputStylesUser({ error: errorState?.firstName })}
                    />
                </Grid>
                <Grid xs={6}>
                    <Input
                        css={{ width: "100%" }}
                        value={user.lastName}
                        label={"last name"}
                        readOnly={type === "read" ? true : false}
                        onChange={(event) => {
                            onchangeUserState({
                                lastName: event.currentTarget.value
                            });
                        }}
                        {...inputStylesUser({ error: errorState?.lastName })}
                    />
                </Grid>
                <Grid xs={6}>
                    <DatePicker
                        value={user.dob}
                        label="date of birth"
                        onChange={(event: string) => {
                            onchangeUserState({
                                dob: event
                            });
                        }}
                    />
                </Grid>
                <Grid xs={6}>
                    <SelectCustom
                        value={user.gender}
                        onChange={(value: number) => {
                            onchangeUserState({
                                gender: value
                            });
                        }}
                        label="gender"
                        disabled={type === "read" ? true : false}
                        options={genderList}
                    />
                </Grid>
                <Grid xs={6}>
                    <Input
                        css={{ width: "100%" }}
                        value={user.phone}
                        label={"phone"}
                        readOnly={type === "read" ? true : false}
                        onChange={(event) => {
                            onchangeUserState({
                                phone: event.currentTarget.value
                            });
                        }}
                        {...inputStylesUser({ error: errorState?.phone })}
                    />
                </Grid>
                <Grid xs={6}>
                    <Input
                        css={{ width: "100%" }}
                        value={user.email}
                        label={"email"}
                        readOnly={type === "read" ? true : false}
                        onChange={(event) => {
                            onchangeUserState({
                                email: event.currentTarget.value
                            });
                        }}
                        {...inputStylesUser({ error: errorState?.email })}
                    />
                </Grid>
                {type !== "create" ? (
                    <>
                        <Grid xs={6}>
                            <Input
                                css={{ width: "100%" }}
                                value={user.created}
                                label={"created"}
                                readOnly
                                {...inputStylesUser({
                                    error: errorState?.email
                                })}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <Input
                                css={{ width: "100%" }}
                                value={user.modified}
                                label={"modified"}
                                readOnly
                                {...inputStylesUser({
                                    error: errorState?.email
                                })}
                            />
                        </Grid>
                    </>
                ) : null}
            </Grid.Container>
        </>
    );
};
