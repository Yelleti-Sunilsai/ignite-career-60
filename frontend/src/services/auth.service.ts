import API from "../lib/axios";

export const registerUser = async (data: any) => {
    const response = await API.post(
        "/auth/register",
        data
    );

    return response.data;
};

export const loginUser = async (data: any) => {
    const response = await API.post(
        "/auth/login",
        data
    );

    return response.data;
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
    const response = await API.post("/auth/verify-otp", data);
    return response.data;
};