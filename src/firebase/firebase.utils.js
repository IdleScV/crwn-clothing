import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCx_Wpf5T_ztItDdllztjsLsuorrUlRqG8',
	authDomain: 'crwn-db-3a814.firebaseapp.com',
	databaseURL: 'https://crwn-db-3a814.firebaseio.com',
	projectId: 'crwn-db-3a814',
	storageBucket: 'crwn-db-3a814.appspot.com',
	messagingSenderId: '33422990951',
	appId: '1:33422990951:web:d8e13fff36743edeb47ec2',
	measurementId: 'G-K1EENJZFHK'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
