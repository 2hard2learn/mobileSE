import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'

export const Head_Mechanic_Confirm_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)

  const head_mechanic_confirm_success = (data) => {
    //console.log(data)
    navigation.navigate({name:'Head_Mechanic_Confirm_1',params:data})
  }
  const head_mechanic_confirm_unsuccess = (msg) => {
    Alert.alert(msg)
  }

  const goHeadMechanicConfirmPage = (info) => {
    // console.log(info)
    // console.log('tt')
    WorkModel.getWorks(info,'confirm',head_mechanic_confirm_success,head_mechanic_confirm_unsuccess)
  }

//   const [input,setInput] = useState()


//   const submit = () => {
//     // console.log(workInfo)
//     // console.log(info)
//     WorkModel.submitWorks(Info.profile,workInfo,input,'check')
//     navigation.navigate({name:'Home'})
//   }
  const goHome = () => {
    navigation.navigate({name:'Home'})
  }

  const confirm = (choice) => {
    if(choice=='ยืนยัน'){
        if(workInfo.status=='ตรวจสภาพแล้ว_รอยืนยัน'){
            Alert.alert('รายงานนี้ผ่านการรับรอง','ส่งไปให้ลูกค้ายืนยันแล้ว')
        }
        if(workInfo.status=='ซ่อมแล้ว_รอยืนยัน'){
            Alert.alert('รายงานนี้ผ่านการรับรอง','ส่งไปที่รายการรอชำระเงิน')
        }
        WorkModel.confirmWork(Info.profile,workInfo,goHome)
    }
    if(choice=='ยกเลิก'){
        Alert.alert('รายงานนี้ไม่ผ่านการรับรอง','ส่งกลับไปให้พนักงานแล้ว')
        WorkModel.returnWork(Info.profile,workInfo,goHome)
    }
    // WorkModel.confirmWork(Info.profile,workInfo)
  }


  let workInfo = route.params

  const whatWork = (status) => {
    if(status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        return 'รายงานตรวจสภาพ'
    }
    if(status=='ซ่อมแล้ว_รอยืนยัน'){
        return 'รายงานซ่อมแซม'
    }
  }

  const whatStatusTop = (status) => {
    if(status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        return 'อาการเบื้องต้น'
    }
    if(status=='ซ่อมแล้ว_รอยืนยัน'){
        return 'ผลการตรวจสภาพ'
    }
  }
  
  const whatTextTop = (status) => {
    if(status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        return workInfo.symptom
    }
    if(status=='ซ่อมแล้ว_รอยืนยัน'){
        return workInfo.check_info
    }
  }

  const whatStatusBottom = (status) => {
    if(status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        return 'ผลการตรวจสภาพ'
    }
    if(status=='ซ่อมแล้ว_รอยืนยัน'){
        return 'รายงานการซ่อมแซม'
    }
  }
  
  const whatTextBottom = (status) => {
    if(status=='ตรวจสภาพแล้ว_รอยืนยัน'){
        return workInfo.check_info
    }
    if(status=='ซ่อมแล้ว_รอยืนยัน'){
        return workInfo.fix_info
    }
  }

  const sendTo = (work,where) => {
    if(where=='ยืนยัน'){
        if(work.status=='ตรวจสภาพแล้ว_รอยืนยัน'){
            return 'ส่งให้ลูกค้า'
        }
        if(work.status=='ซ่อมแล้ว_รอยืนยัน'){
            return 'เช็คบิล'
        }
    }
    if(where=='ยกเลิก'){
        if(work.status=='ตรวจสภาพแล้ว_รอยืนยัน'){
            return 'ส่งกลับ'
        }
        if(work.status=='ซ่อมแล้ว_รอยืนยัน'){
            return 'ส่งกลับ'
        }
    }
  }


  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goHeadMechanicConfirmPage(Info.profile)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{whatWork(workInfo.status)}</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.plate}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:440,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>

          <View style={{flex:1,borderWidth:0,width:'90%',justifyContent:'center'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>{whatStatusTop(workInfo.status)}</Text>
            <View style={{width:'100%',height:100,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
              <ScrollView>
                <Text style={{borderWidth:0,fontSize:15,color:'gray',fontFamily:'Sound-Rounded',borderWidth:0,margin:10}}>{whatTextTop(workInfo.status)}</Text>
              </ScrollView>
            </View>
          </View>

          <View style={{flex:1,borderWidth:0,width:'90%'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>{whatStatusBottom(workInfo.status)}</Text>
            <View style={{width:'100%',height:100,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
              <ScrollView>
              <Text style={{borderWidth:0,fontSize:15,color:'gray',fontFamily:'Sound-Rounded',borderWidth:0,margin:10}}>{whatTextBottom(workInfo.status)}</Text>
              </ScrollView>
            </View>
          </View>

        <View style={{flexDirection:'row',}}>
            <TouchableOpacity style={{width:120,height:50,backgroundColor:'#FC3B3B',justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:20,marginRight:10}}
                onPress={()=>{
                    confirm('ยกเลิก')
                }}
            >
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>{sendTo(workInfo,'ยกเลิก')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:120,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:20,marginLef:0}}
                onPress={()=>{
                    confirm('ยืนยัน')
                }}
            >
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>{sendTo(workInfo,'ยืนยัน')}</Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>


      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <TouchableOpacity activeOpacity={1} style={{width:80,height:80,borderWidth:1,backgroundColor:'#37CFFF',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#89E3FF'}}
          onPress={()=>{
            navigation.navigate({name:'Home'})
          }}
        >
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
