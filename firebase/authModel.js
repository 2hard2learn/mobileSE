import firebaseApp from "./connect";
import 'firebase/auth'
const auth = firebaseApp.auth()

export const singInEmailPass = (email = '', password = '', success, unsuccess) => {
    //console.log(`email = ${email} pass = ${password}`)
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user
            //console.log(`userCredential.user = ${user.email}`)
            success(user.email)
        })
        .catch((err) => {
            //console.log(`singInEmailPass error`)
            unsuccess(err.code + '' + err.messsage)
        })
}

export const signUpEmailPass = (email = '', password = '', success, unsuccess) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user
            //console.log(user)
            success(user)
        })
        .catch((err) => {
            unsuccess(err.code)
        })
}

export const signOut = (success, unsuccess) => {
    auth.signOut()
        .then(() => {
            success()
        })
        .catch((err) => {
            unsuccess(err.code)
        })
}

export const getCurrentUser = () => {
    return auth.currentUser
}

export const changePassword = (newPass, success, unsuccess) => {
    const user = auth.currentUser
    //console.log(`current user : ${user} with ${newPass}`)
    user.updatePassword(newPass)
        .then(() => {
            //console.log('Change password successfully')
            success('Your password has been changed')
        })
        .catch((err) => {
            //console.log('Cannot change password')
            unsuccess(err)
        })
}

export const recoverPassword = (email, success, unsuccess) => {
    // var actionCodeSettings = {
    //     url: 'week10-2022-17d34.firebaseapp.com',
    //     handleCodeInApp: true,
        
    // }
    auth.sendPasswordResetEmail(email)
        .then(() => {
            //console.log(`New password has been send to ${email}`)
            success(`New password has been send to ${email}`)
        })
        .catch((err) => {
            //console.log('Cannot send password reset email')
            unsuccess(err.code + ' ' + err.messsage)
        })
}