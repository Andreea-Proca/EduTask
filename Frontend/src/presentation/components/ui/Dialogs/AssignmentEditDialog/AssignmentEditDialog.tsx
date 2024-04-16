import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useAssignmentEditDialogController } from "./AssignmentEditDialog.controller";
import { AssignmentEditForm } from "@presentation/components/forms/Assignment/AssignmentEditForm";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';

/**
 * This component wraps the user add form into a modal dialog.
 */
export const AssignmentEditDialog = ({ id }: { id: string }) => {
  const { open, close, isOpen } = useAssignmentEditDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <IconButton color="primary" onClick={open}>
        <EditIcon color="primary" fontSize='small' /> 
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      {/* <DialogTitle>
        {formatMessage({ id: "labels.addAssignment" })}
      </DialogTitle> */}
      <DialogContent>
        <AssignmentEditForm id={id} onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};