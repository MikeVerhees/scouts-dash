import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React from 'react';
export const MemberEditDialog = (props: any) => {
  console.log('props', props);

  let name = props.member.name;
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Bewerken</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id='name'
          label='Email Address'
          type='email'
          fullWidth
          variant='outlined'
          onChange={(val) => {
            //you got the input value here
            if (val.target.value) {
              name = val.target.value;
            }
          }}
          value={name}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => props.handleClose(name)} color='primary'>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// class MemberEditDialog extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       name: 'a' as string,
//     };
//   }
//   render() {}
// }
