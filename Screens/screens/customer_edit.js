import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import React , {useState,useEffect} from 'react'
import Constants from 'expo-constants';



import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


export const Customer_Edit = ({navigation}) => {

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>
      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>แก้ไขข้อมูลส่วนตัว</Text>
      </View>
      
      <View style={{width:'100%',height:450,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{width:250,height:280,backgroundColor:'#FFB156',borderWidth:0,borderRadius:10,margin:20}}>
          <View style={{flex:1,borderWidth:0,justifyContent:'center',alignItems:'center',}}>
            <View style={{width:200,borderWidth:0,marginBottom:0}}>
              <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:0,fontFamily:'Sound-Rounded',alignSelf:'flex-start'}}>ชื่อ</Text>
              <TextInput style={{width:'100%',height:30,backgroundColor:'white',borderRadius:5}}></TextInput>
            </View>
          

            <View style={{width:200,borderWidth:0,margin:10}}>
                <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:0,fontFamily:'Sound-Rounded',alignSelf:'flex-start'}}>นามสกุล</Text>
                <TextInput style={{width:'100%',height:30,backgroundColor:'white',borderRadius:5}}></TextInput>
            </View>

            <View style={{width:200,borderWidth:0}}>
                <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:0,fontFamily:'Sound-Rounded',alignSelf:'flex-start'}}>เลขทะเบียนรถ</Text>
                <TextInput style={{width:'100%',height:30,backgroundColor:'white',borderRadius:5}}></TextInput>
            </View>
          </View>
        </View>
        <View style={{width:200,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={{width:80,height:50,backgroundColor:'#00D662',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',marginLeft:0,fontFamily:'Sound-Rounded',}}>ยืนยัน</Text>
          </TouchableOpacity>  
        </View> 
      </View>


      <View style={{width:'100%',height:50,borderWidth:0,backgroundColor:'#69DBFF',justifyContent:'center',alignItems:'center',borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <TouchableOpacity activeOpacity={1} style={{width:80,height:80,borderWidth:1,backgroundColor:'#37CFFF',borderRadius:40,marginBottom:50,justifyContent:'center',alignItems:'center',borderColor:'#89E3FF'}}>
          <Ionicons name="home" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
