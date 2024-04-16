import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSubjectAddDialogController } from "./SubjectAddDialog.controller";
import { SubjectAddForm } from "@presentation/components/forms/Subject/SubjectAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const SubjectAddDialog = () => {
  const { open, close, isOpen } = useSubjectAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addSubject" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addSubject" })}
      </DialogTitle>
      <DialogContent>
        <SubjectAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};