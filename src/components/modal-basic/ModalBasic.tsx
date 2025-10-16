import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { JSX } from "react";

interface Props {
    showModal: boolean;
    openCloseModal: () => void;
    title: string;
    body: JSX.Element;
}

export function ModalBasic({ showModal, openCloseModal, title, body }: Props) {

    return (
    <>
      <Dialog
        open={showModal}
        onClose={openCloseModal}
        fullWidth
        maxWidth="lg"
        disableEscapeKeyDown
      >
        <Grid container bgcolor="#00000018" sx={{ p: 4}}>
            <DialogTitle sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2}}>
                <Typography variant="h5" sx={{ flexGrow: 1 }} style={{ marginLeft: '10px', marginTop: '4px' }}>
                    {title}
                </Typography>
                <Button variant='outlined' color='error' onClick={openCloseModal}>
                    <Close />
                </Button>
            </DialogTitle>
            <DialogContent dividers >{body}</DialogContent>
        </Grid>
      </Dialog>
    </>
  );
}