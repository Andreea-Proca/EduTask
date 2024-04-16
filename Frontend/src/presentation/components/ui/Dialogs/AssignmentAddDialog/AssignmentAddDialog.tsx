import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAssignmentAddDialogController } from "./AssignmentAddDialog.controller";
import { AssignmentAddForm } from "@presentation/components/forms/Assignment/AssignmentAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const AssignmentAddDialog = () => {
  const { open, close, isOpen } = useAssignmentAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addAssignment" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addAssignment" })}
      </DialogTitle>
      <DialogContent>
        <AssignmentAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};