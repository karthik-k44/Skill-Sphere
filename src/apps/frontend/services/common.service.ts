import axios from "axios";

export default class CommonService {
    public static toReadableError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        return new Error(message ?? "Request failed");
    }

    return error instanceof Error ? error : new Error("Request failed");
    }
}