import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'
import * as UserModel from '../../firebase/userModel'

export const Owner_Edit_Account_3 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)
//   let workInfo = route.params


  const owner_edit_account_success = (data) => {
    //console.log(data)
    navigation.navigate({name:'Owner_Edit_Account_1',params:data})
  }
  const owner_edit_account_unsuccess = (msg) => {
    Alert.alert(msg)
  }

  const goOwnerEditAccountPage = (info) => {
    // console.log(info)
    // console.log('tt')
    UserModel.OwnerGetEmployee(info,owner_edit_account_success,owner_edit_account_unsuccess)
  }

  const addRoleSuccess = () => {
    Alert.alert('เพิ่มพนักงานสำเร็จแล้ว',firstname+' '+lastname+' ถูกบรรจุเป็นพนักงานแล้ว')
    navigation.navigate({name:'Home'})
  }
  const addRoleUnsuccess = (msg) => {
    Alert.alert(msg)
  }



  const onSubmitPress = () => {
    // UserModel.changeRole(workInfo,choice,changeRoleSuccess,changeRoleUnsuccess)
    UserModel.addRole(firstname,lastname,choice,Info.profile.garage,addRoleSuccess,addRoleUnsuccess)
  }

//   const onDeletePress = () => {
//     UserModel.deleteRole(workInfo,deleteRoleSuccess,deleteRoleUnsuccess)
//   }

  const [choice,setChoice] = useState('employee')

//   const [email,setEmail] = useState()

  const [firstname,setFirstname] = useState()
  const [lastname,setLastname] = useState()

  const whatChoice = (choice) => {

    if(choice=='employee'){
        return (
            <View style={{borderWidth:0,height:200,width:300,justifyContent:'center',alignItems:'center'}}>
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>เลือกตำแหน่ง</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60,borderWidth:0}}>
                    <View style={{width:120,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,marginRight:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>พนักงานช่าง</Text>
                    </View>
                    <TouchableOpacity style={{width:120,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,marginLeft:10,justifyContent:'center',alignItems:'center',opacity:0.5}}
                        onPress={()=>{
                            setChoice('boss')
                        }}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>หัวหน้าช่าง</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60,borderWidth:0}}>
                    <TouchableOpacity style={{width:150,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,justifyContent:'center',alignItems:'center',opacity:0.5}}
                        onPress={()=>{
                            setChoice('cashier')
                        }}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>พนักงานคิดเงิน</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    if(choice=='boss'){
        return (
            <View style={{borderWidth:0,height:200,width:300,justifyContent:'center',alignItems:'center'}}>
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>เลือกตำแหน่ง</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60,borderWidth:0}}>
                    <TouchableOpacity style={{width:120,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,marginRight:10,justifyContent:'center',alignItems:'center',opacity:0.5}}
                        onPress={()=>{
                            setChoice('employee')
                        }}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>พนักงานช่าง</Text>
                    </TouchableOpacity>
                    <View style={{width:120,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,marginLeft:10,justifyContent:'center',alignItems:'center'}}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>หัวหน้าช่าง</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60,borderWidth:0}}>
                    <TouchableOpacity style={{width:150,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,justifyContent:'center',alignItems:'center',opacity:0.5}}
                        onPress={()=>{
                            setChoice('cashier')
                        }}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>พนักงานคิดเงิน</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    if(choice=='cashier'){
        return (
            <View style={{borderWidth:0,height:200,width:300,justifyContent:'center',alignItems:'center'}}>
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>เลือกตำแหน่ง</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60,borderWidth:0}}>
                    <TouchableOpacity style={{width:120,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,marginRight:10,justifyContent:'center',alignItems:'center',opacity:0.5}}
                        onPress={()=>{
                            setChoice('employee')
                        }}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>พนักงานช่าง</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:120,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,marginLeft:10,justifyContent:'center',alignItems:'center',opacity:0.5}}
                        onPress={()=>{
                            setChoice('boss')
                        }}
                    >
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>หัวหน้าช่าง</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60,borderWidth:0}}>
                    <View style={{width:150,height:50,borderWidth:0,backgroundColor:'#FFB156',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>พนักงานคิดเงิน</Text>
                    </View>
                </View>
            </View>
        )
    }
  }


  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goOwnerEditAccountPage(Info.profile)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>แก้ไขบัญชีพนักงาน</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',alignItems:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:24,color:'white',fontFamily:'Sound-Rounded'}}>เพิ่มบัญชีพนักงาน</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:300,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>
            <View style={{borderWidth:0,width:'100%',height:60,justifyContent:'space-around',flexDirection:'row'}}>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'white'}}>ชื่อจริง</Text>
                    <TextInput style={{width:150,height:35,backgroundColor:'white',color:'#606060',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10,marginBottom:5}}
                    placeholder='ชื่อจริง'
                    value={firstname}
                    onChangeText={(text) => setFirstname(text)}
                    />
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'white'}}>นามสกุล</Text>
                    <TextInput style={{width:150,height:35,backgroundColor:'white',color:'#606060',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10,marginBottom:5}}
                    placeholder='นามสกุล'
                    value={lastname}
                    onChangeText={(text) => setLastname(text)}
                    />
                </View>
            </View>
            {whatChoice(choice)}
        </View>
        <View style={{borderWidth:0,justifyContent:'center',alignItems:'center',height:80,flexDirection:'row',width:350}}>

            <TouchableOpacity style={{width:120,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10}}
                onPress={()=>{
                    onSubmitPress()
                }}
            >
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ยืนยัน</Text>
            </TouchableOpacity>
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
