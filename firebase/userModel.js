import { FieldValue, deleteField } from "firebase/firestore";
import firebaseApp from "./connect";
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const usersColl = DB.collection('User')

export const addUser = (uid, profile, success, unsuccess) => {
    //console.log(`addUser is activated user: ${email} firstname : ${profile.nickname}`)
    usersColl.add({
        CarModel: [],
        UID: uid,
        Name: profile.firstname,
        LastName: profile.lastname,
        PhoneNumber: profile.phone,
        image: "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png",
        role: "user",
        
    })
        .then((doc) => {
            success()
        })
        .catch((err) => {
            unsuccess(err)
        })
}


export const getEmployee = (info,item,success,unsuccess) => {
    // console.log(info)
    usersColl.get()
    .then((snapshot)=>{
        let employee = []
        snapshot.forEach((doc)=>{
            if(doc.data().garage==info.garage && doc.data().role=='employee'){
                employee.push(doc.data())
            }
        })
        success(employee,item)
    })
    .catch((err)=>{
        unsuccess(err)
    })


    // usersColl.where('garage','==',info.garage).get()
    // .then((snapshot)=>{
    //     let employee  = []
    //     snapshot.forEach((doc)=>{
    //         if(doc.data().role=='employee'){
    //             employee.push(doc.data())
    //         }
    //     })
    //     success(employee)
    // })
    // .catch((err)=>{
    //     unsuccess(err)
    // })
}


export const OwnerGetEmployee = (info,success,unsuccess) => {
    usersColl.get()
    .then((snapshot)=>{
        let employee = []
        snapshot.forEach((doc)=>{
            if(doc.data().garage==info.garage && doc.data().role!='owner'){
                employee.push(doc.data())
            }
        })
        success(employee)
    })
    .catch((err)=>{
        // unsuccess(err)
    })
}

export const addRole = (firstname,lastname,role,garage,success,unsuccess) => {
    usersColl.get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            if((doc.data().garage == undefined || doc.data().garage == '') && doc.data().role=='user'){
                if(doc.data().Name==firstname && doc.data().LastName==lastname){
                    usersColl.doc(doc.id).update({role:role,garage:garage})
                }
            }
        })
        success()
    })
}

export const changeRole = (infoEmployee,newRole,success,unsuccess) => {
    usersColl.where('UID','==',infoEmployee.UID).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            usersColl.doc(doc.id).update({role:newRole})
        })
        success()
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const deleteRole = (infoEmployee,success,unsuccess) => {
    usersColl.where('UID','==',infoEmployee.UID).get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            usersColl.doc(doc.id).update({role:'user'})
            usersColl.doc(doc.id).update({garage:deleteField()})
        })
        success()
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

// export const getUserByDocID = (docID, success, unsuccess) => {
//     usersColl.doc(docID).get()
//         .then((doc) => {
//             if (doc.exists) {
//                 success(doc)
//             } else {
//                 unsuccess(`User not found`)
//             }
//         })
//         .catch((err) => {
//             unsuccess(err)
//         })
// }

export const getUserByEmail = (email,success,unsuccess) => {
    //console.log(`getUserByUsername is activated username : ${username}`)
    usersColl.where('email','==',email).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            //console.log(doc.id, "=>", doc.data())
            success(doc)
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}

export const getUserByUID = (uid,success,unsuccess) => {
    usersColl.where('UID','==',uid).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            // console.log(doc.id,'=>', doc.data())
            success(doc)
        })
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const getInfoByEmail = (email,success,unsuccess) => {
    usersColl.where('email','==',email).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            success(doc.data())
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}