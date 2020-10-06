import { firebase, db } from './config.js'

export const getUser = async ({uid}) => {
  try {
    const userQuery = await db.collection('users').where("uid", "==", uid).get();
    const user = userQuery.docs[0].data();
    return user;
  } catch(err) {
    alert(err);
  }
}

export const createUser = async ({username, email, password}) => {
  try {
    const {additionalUserInfo, user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (additionalUserInfo.isNewUser) {
      await db.collection('users').add({
        uid: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: username,
        email,
        verified: false,
      });
      const actionCodeSettings = {
        url: 'https://the-habit-loop.firebaseapp.com/',
        handleCodeInApp: true,
      };
      firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
    }
  } catch(err) {
    throw new Error(err.message);
  }
};

export const signInCustom = async ({email, password}) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch(err) {
    throw new Error(err.message);
  }
}

export const signInProvider = async ({provider, email}) => {
  try {
    let providerAuth;
    if (provider === 'google') {
      providerAuth = new firebase.auth.GoogleAuthProvider();
    }
    await firebase.auth().signInWithPopup(providerAuth);
  } catch(err) {
    throw new Error(err.message);
  }
}