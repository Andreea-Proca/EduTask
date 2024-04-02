import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useProfessorAddDialogController } from "./ProfessorAddDialog.controller";
import { UserAddForm } from "@presentation/components/forms/User/UserAddForm";
import { useIntl } from "react-intl";

/**
 * This component wraps the user add form into a modal dialog.
 */
export const ProfessorAddDialog = () => {
  const { open, close, isOpen } = useProfessorAddDialogController();
  const { formatMessage } = useIntl();

  return <div>
    <Button variant="outlined" onClick={open}>
      {formatMessage({ id: "labels.addUser" })}
    </Button>
    <Dialog
      open={isOpen}
      onClose={close}>
      <DialogTitle>
        {formatMessage({ id: "labels.addUser" })}
      </DialogTitle>
      <DialogContent>
        <UserAddForm onSubmit={close} />
      </DialogContent>
    </Dialog>
  </div>
};