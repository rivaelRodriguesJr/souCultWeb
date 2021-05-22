import React, { useState } from  "react";
import { Button, Dialog, DialogActions, DialogTitle, IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

interface DeleteButtonProps {
  handleDelete: () => void
}

const  DeleteButton = ({ handleDelete }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles((theme) => ({
    deleteButton: {
      color: theme.palette.error.main,
    }
  }));

  
  const classes = useStyles();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <IconButton onClick={handleClickOpen}>
      <DeleteIcon
        // className="cursor-pointer"
        color="error"
        
      />
    </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deseja realizar a exclusão?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Não
          </Button>
          <Button onClick={() => {
            handleDelete();
            handleClose();
          }} className={classes.deleteButton} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton
