import axios from "axios";
import { QueryClient, DefaultOptions } from "@tanstack/react-query";

export const BASE_URL = "https://api.adrop.io";

export const initFetchInstance = (baseURL: string) =>
    axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            Accept: "application/json",
        },
    });

export const fetchInstance = () => initFetchInstance(BASE_URL);

const defaultOptions: DefaultOptions = {
    queries: {
        retry: 3,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    },
};

export const queryClient = new QueryClient({
    defaultOptions,
});
