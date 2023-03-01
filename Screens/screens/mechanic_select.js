import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';




export const Mechanic_Select = ({navigation}) => {

  return (
    <View style={{flex:1,paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ตรวจเช็คสภาพรถยนต์</Text>
      </View>

      <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
        <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>งานที่ยังไม่เสร็จ</Text>
      </View>
       
      <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
        <View style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center'}}>
          <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>กท-3333</Text>
        </View>
        <View style={{flex:1,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#A1A1A1'}}>ไม่มีงานในตอนนี้</Text>
        </View>
      </View>

      
      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <View style={{width:80,height:80,borderWidth:1,backgroundColor:'#37CFFF',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#89E3FF'}}>
          <Ionicons name="home" size={30} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
