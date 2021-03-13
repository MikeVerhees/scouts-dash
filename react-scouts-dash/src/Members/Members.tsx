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
  const clubRef = userData.clubRef;
  const {
    status,
    data: members,
  }: { status: any; data: Member[] } = useFirestoreCollectionData(
    clubRef.collection('members'),
    {
      idField: 'id',
    }
  );
  if (status === 'loading') {
    return <p>Fetching members...</p>;
  }
  return members ? <MemberList members={members} /> : <div />;
};

const MemberList = ({ members }: { members: Array<any> }) => {
  console.log('members', members);
  return (
    <>
      <List>
        {members.map((member) => {
          return (
            <ListItem key={member.id}>
              <ListItemText primary={member.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => edit(member.id)}
                  edge='end'
                  aria-label='delete'
                >
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

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

function edit(id: string) {
  console.log('id', id);
}
