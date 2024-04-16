import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useSubjectEditDialogController } from "./SubjectEditDialog.controller";
import { SubjectEditForm } from "@presentation/components/forms/Subject/SubjectEditForm";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';

/**
 * This component wraps the user add form into a modal dialog.
 */
export const SubjectEditDialog = ({ id }: { id: string }) => {
  const { open, close, isOpen } = useSubjectEditDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <IconButton color="primary" onClick={open}>
        <EditIcon color="primary" fontSize='small' /> 
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}>
      {/* <DialogTitle>
        {formatMessage({ id: "labels.editSubject" })}
      </DialogTitle> */}
      <DialogContent>
        <SubjectEditForm onSubmit={close} id={id}/>
      </DialogContent>
    </Dialog>
  </div>
};