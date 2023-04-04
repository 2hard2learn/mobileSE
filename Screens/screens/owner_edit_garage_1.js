import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'

export const Owner_Edit_Garage_1 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)
  let workInfo = route.params
//   const mechanic_check_success = (data) => {
//     //console.log(data)
//     navigation.navigate({name:'Mechanic_Check_1',params:data})
//   }
//   const mechanic_check_unsuccess = (msg) => {
//     Alert.alert(msg)
//   }

//   const goMechanicCheckPage = (info) => {
//     // console.log(info)
//     // console.log('tt')
//     WorkModel.getWorks(info,'check',mechanic_check_success,mechanic_check_unsuccess)
//   }

// //   const [input,setInput] = useState()


//   const submit = () => {
//     // console.log(workInfo)
//     // console.log(info)
//     WorkModel.submitWorks(Info.profile,workInfo,input,'check')
//     navigation.navigate({name:'Home'})
//   }

    const edit_garage_success = () => {
        navigation.navigate({name:'Home'})
    }
    const edit_garage_unsuccess = () => {

    }

    const onEditPress = () => {
        let newGarageInfo = {
            'DayOpen':dayopen,
            'dayClose':dayclose,
            'TimeOpen':timeopen,
            'title':title,
            'queueMax':qmax,
            'queueNow':qnow
        }
        WorkModel.editGarage(Info.profile,newGarageInfo,edit_garage_success,edit_garage_unsuccess)
    }


    const [dayopen,setDayopen] = useState(workInfo.DayOpen)
    const [dayclose,setDayclose] = useState(workInfo.dayClose)
    const [timeopen,setTimeopen] = useState(workInfo.TimeOpen)
    const [title,setTitle] = useState(workInfo.title)
    const [qmax,setQmax] = useState((workInfo.queueMax).toString())
    const [qnow,setQnow] = useState((workInfo.queueNow).toString())

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
            //   goMechanicCheckPage(Info.profile)
                navigation.navigate({name:'Home'})
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>แก้ไขข้อมูลอู่</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.name}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:300,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>

          <View style={{flex:1,borderWidth:0,width:'90%',justifyContent:'space-around'}}>
            <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>วันเปิดทำการ</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            placeholder={dayopen}
                            value={dayopen}
                            onChangeText={(text)=>{
                                setDayopen(text)
                            }}
                        />
                    </View>
                </View>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>วันปิดทำการ</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                    <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            value={dayclose}
                            onChangeText={(text)=>{
                                setDayclose(text)
                            }}
                        />
                    </View>
                </View>

            </View>
            <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>เวลาทำการ</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            keyboardType='decimal-pad'
                            value={timeopen}
                            onChangeText={(text)=>{
                                setTimeopen(text)
                            }}
                        />
                    </View>
                </View>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>คำอธิบายร้าน</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            value={title}
                            onChangeText={(text)=>{
                                setTitle(text)
                            }}
                        />
                    </View>
                </View>

            </View>
            <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-around'}}>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>จำนวนรถที่รับได้</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            placeholder={qmax}
                            keyboardType='decimal-pad'
                            value={qmax}
                            onChangeText={(text)=>{
                                setQmax(text)
                            }}
                        />
                    </View>
                </View>
                <View style={{borderWidth:0}}>
                    <Text style={{borderWidth:0,fontSize:18,color:'white',fontFamily:'Sound-Rounded'}}>จำนวนรถตอนนี้</Text>
                    <View style={{borderWidth:0,backgroundColor:'white',width:150,height:30,borderRadius:10,justifyContent:'center'}}>
                        <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                            keyboardType='decimal-pad'
                            value={qnow}
                            onChangeText={(text)=>{
                                setQnow(text)
                            }}
                        />
                    </View>
                </View>

            </View>
            <View style={{borderWidth:0,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{borderWidth:0,width:150 ,height:50,backgroundColor:'#FFB156',justifyContent:'center',alignItems:'center',borderRadius:10}}
                    onPress={()=>{
                        navigation.navigate({name:'AddLocation'})
                    }}
                >
                <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>แก้ไขที่อยู่ร้าน</Text>
                </TouchableOpacity>
            </View>
          </View>


          
        </View>
        <View style={{marginTop:20}}>
            <TouchableOpacity style={{width:150,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:20}}
                onPress={()=>{
                    if( dayopen=='' || dayclose=='' || timeopen=='' || title=='' || qmax=='' || qnow==''){
                        Alert.alert('เกิดข้อผิดพลาด','กรุณากรอกข้อมูลให้ครบถ้วน')
                    }else{
                        onEditPress()
                    }
                }}
            >
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ยืนยันการแก้ไข</Text>
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
