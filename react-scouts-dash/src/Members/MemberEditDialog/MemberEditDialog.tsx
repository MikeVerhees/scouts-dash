import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Member } from '../../interfaces';
import { render } from '@testing-library/react';

type Props = {
  member: Member;
  open: boolean;
  handleClose: any;
};
type State = {
  name: string;
};
export class MemberEditDialog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    console.log(' constr props', this.props);
    console.log('constr state', this.state);
    this.state = {
      name: this.props.member.name,
    };
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.member !== this.props.member) {
      if (this.props.member) {
        this.setState({ name: this.props.member.name });
      }
    }
  }
  render() {
    console.log('render props', this.props);
    console.log('render state', this.state);
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Bewerken</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id='name'
            label='Naam'
            type='text'
            fullWidth
            variant='outlined'
            onChange={(val) => {
              //you got the input value here
              if (val.target.value) {
                console.log('val.target.value', val.target.value);
                this.setState({ name: val.target.value });
              }
            }}
            value={this.state.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color='primary'>
            Annuleren
          </Button>
          <Button
            onClick={() => this.props.handleClose(this.state.name)}
            color='primary'
          >
            Opslaan
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
// class MemberEditDialog extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       name: 'a' as string,
//     };
//   }
//   render() {}
// }
