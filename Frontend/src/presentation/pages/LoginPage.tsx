import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";
import { ContentCard } from "@presentation/components/ui/ContentCard";

export const LoginPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Login" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center"}}>
            <ContentCard color="#f0f0f0">
                <LoginForm />
            </ContentCard>
            </Box>
        </WebsiteLayout>
    </Fragment>
});
