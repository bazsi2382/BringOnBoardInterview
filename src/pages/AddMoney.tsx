import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@material-ui/core';
import { isNumber } from 'lodash';
import { useState } from 'react';

type AppProps = {
  setMoney: Function,
};

export default function AddMoney(props: AppProps) {
  const { setMoney } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [cashIn, setCashIn] = useState<number | string>('');

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addMoney = () => {
    handleClose();
    if (isNumber(+cashIn)) {
      setMoney((previousMoney: number) => +(previousMoney + (+cashIn || 0)));
      setCashIn('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCashIn(value);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>Add money</Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
      >
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={cashIn}
            onChange={handleChange}
            inputProps={{ type: 'number' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addMoney}>Add</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
