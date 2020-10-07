import { firebase, db } from './config.js'
import { mobileCheck } from '../helpers/helpers.js';

export const getUser = async ({uid}) => {
  try {
    const userQuery = await db.collection('users').where("uid", "==", uid).get();
    const user = userQuery.docs[0].data();
    return user;
  } catch(err) {
    alert(err);
  }
}

export const addDbUser = async ({ uid, name, email }) => {
  try {
    await db.collection('users').add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, name, email});
  } catch(err) {
    throw new Error(err.message);
  }
}

export const createUser = async ({name, email, password}) => {
  try {
    const { additionalUserInfo, user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (additionalUserInfo.isNewUser) {
      await addDbUser({ uid: user.uid, name, email });
    }
  } catch(err) {
    throw new Error(err.message);
  }
};

export const signInCustom = async ({email, password}) => {
  try {
    const methods = await firebase.auth().fetchSignInMethodsForEmail(email);
    if (methods.length && !methods.includes('password')) {
      throw new Error('There is no user record corresponding to this identifier');
    }
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch(err) {
    throw new Error(err.message);
  }
}

export const signInProvider = async ({provider}) => {
  try {
    let providerAuth;
    if (provider === 'google') {
      providerAuth = new firebase.auth.GoogleAuthProvider();
    }
    const method = mobileCheck() ? 'signInWithRedirect' : 'signInWithPopup';
    var { user, additionalUserInfo } = await firebase.auth()[method](providerAuth);
    if (additionalUserInfo.isNewUser) {
      const { name, email } = additionalUserInfo.profile;
      const { uid } = user;
      await addDbUser({ uid, name, email });
    }
  } catch(err) {
    throw new Error(err.message);
  }
}