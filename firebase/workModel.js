import firebaseApp from "./connect";
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const worksColl = DB.collection('works')

export const Mechanic_Check_getWorksByUsername = (username,success,unsuccess) => {
    //console.log(username)
    worksColl.where('mechanic','==',username).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let works = []
            snapshot.forEach((doc)=>{
                if(doc.data().status=='รอเช็ค'){
                    works.push(doc.data())
                }
            })
            success(works)
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}

export const Mechanic_Fix_getWorksByUsername = (username,success,unsuccess) => {
    //console.log(username)
    worksColl.where('mechanic','==',username).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let works = []
            snapshot.forEach((doc)=>{
                if(doc.data().status=='รอซ่อม'){
                    works.push(doc.data())
                }
            })
            success(works)
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}

export const HeadMechanic_Assign_getWorks = (success,unsuccess) => {
    worksColl.where('status','!=','ชำระเงินแล้ว').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let works = []
            snapshot.forEach((doc) => {
                if(doc.data().status=='รอมอบหมาย'){
                    works.push(doc.data())
                }
            })
            success(works)
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}

export const HeadMechanic_Confirm_getWorks = (success,unsuccess) => {
    worksColl.where('status','!=','ชำระเงินแล้ว').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let works = []
            snapshot.forEach((doc) => {
                if(doc.data().status=='รอยืนยัน'){
                    works.push(doc.data())
                }
            })
            success(works)
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}

export const Cashier_Checkbill_getWorks = (success,unsuccess) => {
    worksColl.where('status','!=','ชำระเงินแล้ว').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            let works = []
            snapshot.forEach((doc) => {
                if(doc.data().status=='รอเช็คบิล'){
                    works.push(doc.data())
                }
            })
            success(works)
        })
    })
    .catch((err) => {
        unsuccess(err)
    })
}



