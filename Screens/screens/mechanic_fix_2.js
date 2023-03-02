import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

import * as WorkModel from '../../firebase/workModel'

export const Mechanic_Fix_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)

  const mechanic_fix_success = (data) => {

    navigation.navigate({name:'Mechanic_Fix_1',params:data})
  }
  const mechanic_fix_unsuccess = (msg) => {
    Alert.alert(msg)
  }

  const goMechanicFixPage = (username) => {
    WorkModel.Mechanic_Fix_getWorksByUsername(username,mechanic_fix_success,mechanic_fix_unsuccess)
  }


  let workInfo = route.params

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goMechanicFixPage(Info.profile.username)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ซ่อมแซมรถยนต์</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.firstVehicleId+'-'+workInfo.lastVehicleId}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:440,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>

          <View style={{flex:1,borderWidth:0,width:'90%',justifyContent:'center'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ผลการตรวจเช็ค</Text>
            <TextInput style={{width:'100%',height:100,borderWidth:0,borderRadius:10,backgroundColor:'white'}}></TextInput>
          </View>

          <View style={{flex:1,borderWidth:0,width:'90%'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'red',fontFamily:'Sound-Rounded'}}>รายงานการซ่อมแซม</Text>
            <TextInput style={{width:'100%',height:100,borderWidth:0,borderRadius:10,backgroundColor:'white'}}></TextInput>
          </View>

          <TouchableOpacity style={{width:200,height:50,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center',borderRadius:10,marginBottom:20}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>ยืนยันการซ่อมแซม</Text>
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
