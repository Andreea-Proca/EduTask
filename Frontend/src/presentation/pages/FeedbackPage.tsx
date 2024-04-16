import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { AssignmentTable } from "@presentation/components/ui/Tables/AssignmentTable";
import { FeedbackForm } from "@presentation/components/forms/Feedback/FeedbackForm";

export const FeedbackPage = memo(() => {
  return <Fragment>
    <Seo title="MobyLab Web App | Feedback" />
    <WebsiteLayout>
      <Box          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150%",
            marginLeft: "-25%",
            marginRight: "-25%",
          }}>
        <ContentCard color="#f0f0f0">
          <FeedbackForm />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
