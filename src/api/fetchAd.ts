import { AxiosResponse } from "axios";
import { fetchInstance } from "./client";

export type FetchAdParams = {
    unit: string;
    uid: string;
    pf: string;
    lcl: string;
};

export type AdData = {
    format: string;
    unit: string;
    ad: string;
    w: number;
    h: number;
    advertiser?: string;
    icon?: string;
    cover?: string;
    advertiserURL?: string;
    headline?: string;
    body?: string;
    callToAction?: string;
    destinationURL?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accountTag?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    creativeTag?: any;
};

type AdApiResponse = {
    code: number;
    msg: string;
    result: AdData;
};

export const fetchAd = async (params: FetchAdParams): Promise<AdData> => {
    const response: AxiosResponse<AdApiResponse> = await fetchInstance().get(
        "/request",
        {
            params: {
                unit: params.unit,
                uid: params.uid,
                pf: params.pf,
                lcl: params.lcl,
            },
        }
    );

    if (response.data.code !== 0) {
        throw new Error(`API Error: ${response.data.msg}`);
    }

    return response.data.result;
};
