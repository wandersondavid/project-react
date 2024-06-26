import { Dialog, DialogContent } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const DialogForm = ({ open, onClose, children }: Props) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};
