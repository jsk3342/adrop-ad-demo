import { useAd } from "../api/queries/useAd";
import { FetchAdParams } from "../api/fetchAd";

const defaultAdParams: FetchAdParams = {
    unit: "PUBLIC_TEST_UNIT_ID_375_80",
    uid: "test-user-123",
    pf: "web",
    lcl: "ko_KR",
};

const AdBanner = () => {
    const { data: adData } = useAd(defaultAdParams);

    return (
        <div
            data-testid="ad-content"
            dangerouslySetInnerHTML={{ __html: adData.ad }}
        />
    );
};

export default AdBanner;
