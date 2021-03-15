import * as React from 'react';
import 'firebase/firestore';
import {
  useUser,
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData,
} from 'reactfire';
import './Members.css';
import { Member, User } from './../interfaces';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Edit } from '@material-ui/icons';

import { MemberEditDialog } from './MemberEditDialog/MemberEditDialog';

const GetUser = ({ user }: { user: any }) => {
  const userRef = useFirestore().doc(`users/${user.uid}`);
  const {
    status,
    data: userData,
  }: { status: any; data: User } = useFirestoreDocData(userRef, {
    idField: 'id',
  });
  console.log('userData', userData);

  if (status === 'loading') {
    return <p>Fetching userData...</p>;
  }
  return userData ? <GetMembers userData={userData} /> : <div />;
};
const GetMembers = ({ userData }: { userData: any }) => {
  const membersRef = userData.clubRef.collection('members');
  const {
    status,
    data: members,
  }: { status: any; data: Member[] } = useFirestoreCollectionData(membersRef, {
    idField: 'id',
  });
  if (status === 'loading') {
    return <p>Fetching members...</p>;
  }
  return members ? (
    <MemberList members={members} membersRef={membersRef} />
  ) : (
    <div />
  );
};
type Props = {
  members: Array<Member>;
  membersRef: firebase.default.firestore.CollectionReference;
};

type State = {
  selectedMember: Member;
  name: string;
  open: boolean;
};
class MemberList extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedMember: {} as Member,
      name: '',
      open: false,
    };
  }
  handleClickOpen = (member: Member) => {
    console.log('open');
    this.setState({ open: true, selectedMember: member, name: member.name });
  };
  render() {
    console.log('this.props', this.props);

    const handleClose = (result: any) => {
      console.log('result', result);
      this.setState({ open: false });

      if (typeof result === 'string') {
        this.props.membersRef
          .doc(this.state.selectedMember.id)
          .set({ name: result });
      }
    };

    console.log('members', this.props.members);

    return (
      <>
        <List>
          {this.props.members.map((member: Member) => {
            return (
              <ListItem key={member.id}>
                <ListItemText primary={member.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => this.handleClickOpen(member)}
                    edge='end'
                    aria-label='edit'
                  >
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <MemberEditDialog
          member={this.state.selectedMember}
          open={this.state.open}
          handleClose={handleClose}
        ></MemberEditDialog>
      </>
    );
  }
}

export const Members = () => {
  const { status, data: user, hasEmitted } = useUser(undefined, {
    initialData: {},
  });
  console.log(user.uid);

  if (status === 'loading' || hasEmitted === false) {
    return <div />;
  }

  return user ? <GetUser user={user} /> : <div />;
};
