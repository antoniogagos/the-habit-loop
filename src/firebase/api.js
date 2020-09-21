import fb from './config.js'

export const createUser = async ({user}) => {
  try {
    await fb.auth().createUserWithEmailAndPassword(email, password);
  } catch(err) {
    var errorCode = error.code;
    var errorMessage = error.message;
    return { errorCode, errorMessage }
  }
};