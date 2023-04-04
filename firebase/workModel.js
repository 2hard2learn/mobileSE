import { documentId, serverTimestamp } from "firebase/firestore";
import firebaseApp from "./connect";
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const garagesColl = DB.collection('Garage')
const usersColl = DB.collection('User')

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
export const returnWork = (info,workInfo,success) => {
    if(workInfo.status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        garagesColl.doc(info.garage).collection('Duty').doc(workInfo.workId).update({status:'รอตรวจสภาพ'})
        success()
    }
    if(workInfo.status=='ซ่อมแล้ว_รอยืนยัน'){
        garagesColl.doc(info.garage).collection('Duty').doc(workInfo.workId).update({status:'รอซ่อม'})
        success()
    }

}

export const confirmWork = (info,workInfo,success) => {
    if(workInfo.status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        garagesColl.doc(info.garage).collection('Duty').doc(workInfo.workId).update({status:'ตรวจสภาพแล้ว_รอลูกค้ายืนยัน',check_time: serverTimestamp()})
        success()
    }
    if(workInfo.status=='ซ่อมแล้ว_รอยืนยัน'){
        garagesColl.doc(info.garage).collection('Duty').doc(workInfo.workId).update({status:'รอประเมินราคา',fix_time: serverTimestamp()})
        success()
    }

}



export const giveWork = (workInfo,employeeInfo,success,unsuccess) => {
    // garagesColl.doc(employeeInfo.garage).collection('Duty').where('workId','==',workInfo.workId).get()
    // .then((snapshot)=>{
    //     snapshot.forEach((doc)=>{
    //         console.log(doc.data())
    //     })
    // })
    if(workInfo.status=='รอมอบหมายตรวจสภาพ'){
        garagesColl.doc(employeeInfo.garage).collection('Duty').doc(workInfo.workId).update({work_owner:employeeInfo.UID,status:'รอตรวจสภาพ'})
        success()
    }
    if(workInfo.status=='รอมอบหมายซ่อม'){
        garagesColl.doc(employeeInfo.garage).collection('Duty').doc(workInfo.workId).update({work_owner:employeeInfo.UID,status:'รอซ่อม'})
        success()
    }
    else{
        unsuccess()
    }
}



export const submitWorks = (info,workInfo,text,where_you_from) => {
    // console.log(info)
    if(where_you_from=='check'){
        garagesColl.doc(info.garage).collection('Duty').where('workId','==',workInfo.workId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                garagesColl.doc(info.garage).collection('Duty').doc(doc.id).update({check_info:text,status:'ตรวจสภาพแล้ว_รอยืนยัน',date_submit:serverTimestamp()})
            })
        })
    }
    if(where_you_from=='fix'){
        garagesColl.doc(info.garage).collection('Duty').where('workId','==',workInfo.workId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                garagesColl.doc(info.garage).collection('Duty').doc(doc.id).update({fix_info:text,status:'ซ่อมแล้ว_รอยืนยัน',date_submit:serverTimestamp()})
            })
        })
    }
}


export const editGarage = (info,newInfo,success,unsuccess) => {
    garagesColl.get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            if(doc.id==info.garage){
                garagesColl.doc(info.garage).update({
                    DayOpen:newInfo.DayOpen,
                    dayClose:newInfo.dayClose,
                    TimeOpen:newInfo.TimeOpen,
                    title:newInfo.title,
                    queueMax:newInfo.queueMax,
                    queueNow:newInfo.queueNow})
                success()
            }
        })
    })
    .catch((err)=>{
        unsuccess(err)
    })
}

export const getWorks = (info,where_you_go,success,unsuccess) => {
    if(where_you_go=='check'){
        garagesColl.doc(info.garage).collection('Duty').get()
        .then((snapshot)=>{
            let works = []
            snapshot.forEach((doc)=>{
                if(doc.data().work_owner==info.UID && doc.data().status=='รอตรวจสภาพ'){
                    works.push(doc.data())
                }
            })
            success(works)
        })
        .catch((err)=>{
            unsuccess(err)
        })
    }
    // if(where_you_go=='check'){
    //     garagesColl.doc(info.garage).collection('Duty').where('work_owner','==',info.UID).get()
    //     .then((snapshot)=>{
    //         snapshot.forEach((doc) =>{
    //             let works = []
    //             snapshot.forEach((doc)=>{
    //                 if(doc.data().status=='รอตรวจสภาพ'){
    //                     works.push(doc.data())
    //                 }
    //             })
    //             success(works)
    //         })
    //     })
    //     .catch((err)=>{
    //         unsuccess(err)
    //     })
    // }
    if(where_you_go=='fix'){
        garagesColl.doc(info.garage).collection('Duty').get()
        .then((snapshot)=>{
            snapshot.forEach((doc) =>{
                let works = []
                snapshot.forEach((doc)=>{
                    if(doc.data().work_owner==info.UID && doc.data().status=='รอซ่อม'){
                        works.push(doc.data())
                    }
                })
                success(works)
            })
        })
        .catch((err)=>{
            unsuccess(err)
        })
    }
    if(where_you_go=='assign'){
        garagesColl.doc(info.garage).collection('Duty').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                let works = []
                snapshot.forEach((doc)=>{
                    if(doc.data().status=='รอมอบหมายตรวจสภาพ' || doc.data().status=='รอมอบหมายซ่อม'){
                        works.push(doc.data())
                    }
                })
                success(works)
            })
        })
        .catch((err)=>{
            unsuccess(err)
        })
    }
    if(where_you_go=='confirm'){
        garagesColl.doc(info.garage).collection('Duty').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                let works = []
                snapshot.forEach((doc)=>{
                    if(doc.data().status=='ตรวจสภาพแล้ว_รอยืนยัน' || doc.data().status=='ซ่อมแล้ว_รอยืนยัน'){
                        works.push(doc.data())
                    }
                })
                success(works)
            })
        })
        .catch((err)=>{
            unsuccess(err)
        })
    }
    if(where_you_go=='setprice'){
        garagesColl.doc(info.garage).collection('Duty').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                let works = []
                snapshot.forEach((doc)=>{
                    if(doc.data().status=='รอประเมินราคา'){
                        works.push(doc.data())
                    }
                })
                success(works)
            })
        })
        .catch((err)=>{
            unsuccess(err)
        })
    }


    if(where_you_go=='history'){
        garagesColl.doc(info.garage).collection('Duty').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                let works = []
                snapshot.forEach((doc)=>{
                    if(doc.data().status=='ชำระเงินแล้ว'){
                        works.push(doc.data())
                    }
                })
                success(works)
            })
        })
        .catch((err)=>{
            unsuccess(err)
        })
    }
}

export const Mechanic_Check_getWorksByEmail = (Email,success,unsuccess) => {
    //console.log(username)
    worksColl.where('mechanic','==',Email).get()
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

export const Mechanic_Fix_getWorksByEmail = (Email,success,unsuccess) => {
    //console.log(username)
    worksColl.where('mechanic','==',Email).get()
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



