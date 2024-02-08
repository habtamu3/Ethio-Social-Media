import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WrapperWidget from "components/WrapperWidget";
const AdWidget=()=>{
    const {palette}=useTheme();
    const dark=palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main;
    return (
        <WrapperWidget>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <IconButton>
                <Typography color={medium}>Create ads</Typography>
                </IconButton>
            </FlexBetween>
            <img 
            width="100%"
            height="auto"
            alt="advert"
            src="http://localhost:4444/assets/public/assets/ads.jpg"
            style={{
                borderRadius:"0.75rem", margin:"0.75rem 0"
            }}
            />
            <FlexBetween>
                <Typography color={main}>Amhara Bank</Typography>
                <Typography color={medium}>amharabanksc.et</Typography>
            </FlexBetween>
            <Typography color={medium}>
                The throng of shareholders makes Amhara Bank the most powerful and prominent bank in Ethiopia as it was established by more than 141 thousand subscribers with 4.8 billion paid up and 6.5 billion subscribed capital.
            </Typography>
        </WrapperWidget>
    )
}
export default AdWidget;