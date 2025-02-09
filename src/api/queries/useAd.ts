import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAd, FetchAdParams, AdData } from "../fetchAd";

export const useAd = (params: FetchAdParams) => {
    return useSuspenseQuery<AdData, Error>({
        queryKey: ["ad", params],
        queryFn: () => fetchAd(params),
    });
};
