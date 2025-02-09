import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAd } from "./useAd";
import * as fetchAdModule from "../fetchAd";
import { FetchAdParams, AdData } from "../fetchAd";

const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

const createWrapper = () => {
    const queryClient = createQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe("useAd hook", () => {
    const adParams: FetchAdParams = {
        unit: "PUBLIC_TEST_UNIT_ID_375_80",
        uid: "test-user-123",
        pf: "web",
        lcl: "ko_KR",
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return ad data on successful fetch", async () => {
        const fakeAdData: AdData = {
            format: "banner",
            unit: "PUBLIC_TEST_UNIT_ID_375_80",
            ad: "<div>Test Ad Content</div>",
            w: 375,
            h: 80,
        };

        jest.spyOn(fetchAdModule, "fetchAd").mockResolvedValue(fakeAdData);

        const { result } = renderHook(() => useAd(adParams), {
            wrapper: createWrapper(),
        });

        await waitFor(() => result.current.isSuccess === true);
        expect(result.current.data).toEqual(fakeAdData);
    });

    it("should set error on fetch failure", async () => {
        const errorMessage = "Failed to fetch ad";
        jest.spyOn(fetchAdModule, "fetchAd").mockRejectedValue(
            new Error(errorMessage)
        );

        const { result } = renderHook(() => useAd(adParams), {
            wrapper: createWrapper(),
        });

        await waitFor(() => result.current.isError === true);
        expect(result.current.error?.message).toContain(errorMessage);
    });
});
