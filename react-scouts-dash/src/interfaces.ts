import 'firebase'
export interface User {
    name: string;
    clubRef: firebase.default.firestore.DocumentReference;
}
export interface Club {
    name: string;
}
export interface Member {
    name: string;
}
