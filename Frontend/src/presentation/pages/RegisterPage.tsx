import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { UserTable } from "@presentation/components/ui/Tables/UserTable";
import { UserAddForm } from "@presentation/components/forms/User/UserAddForm";

export const RegisterPage = memo(() => {
  return <Fragment>
    <Seo title="MobyLab Web App | Register" />
    <WebsiteLayout>
        {/* <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center", width: "150%", display: "flex",  placeItems: "center" }}> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150%",
            marginLeft: "-25%",
            marginRight: "-25%",
          }}
        >   
            <ContentCard  color="#f0f0f0">
                <UserAddForm />
            </ContentCard>
        </Box>
    </WebsiteLayout>
  </Fragment>
});
