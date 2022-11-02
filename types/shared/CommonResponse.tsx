export interface CommonResponseType<T> {
    success: boolean;
    result: T;
    message: string;
    statusCode: number;
}
