import { Button, Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from "@mui/material";
import { useUserEditDialogController } from "./UserEditDialog.controller";
import { UserEditForm } from "@presentation/components/forms/User/UserEditForm";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';

/**
 * This component wraps the user add form into a modal dialog.
 */


export const UserEditDialog = ({ id }: { id: string }) => {
  const { open, close, isOpen } = useUserEditDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <IconButton color="primary" onClick={open}>
        <EditIcon color="primary" fontSize='small' /> 
    </IconButton>
    <Dialog
      open={isOpen}
      onClose={close}
     // style={{ color: '#f0f0f0' }} 
     >
      <DialogContent>
        <UserEditForm id={id} onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};