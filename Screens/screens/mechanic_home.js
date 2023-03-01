import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button, TouchableOpacity } from 'react-native';
import React , {useState,useEffect} from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';



export const Mechanic_Home = ({navigation}) => {

  return (
    <View style={{flex:1,paddingTop: Constants.statusBarHeight}}>
      <View style={{height:80,backgroundColor:'#05C3FF',justifyContent:'center',alignContent:'center'}}>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>หน้าแรก</Text>
      </View>
      <View style={{borderWidth:0,height:140,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:330,height:100,backgroundColor:'#D9D9D9',borderRadius:10,justifyContent:'center',flexDirection:'row'}}>
          <View style={{borderWidth:0,width:100,height:100,justifyContent:'center',alignItems:'center',borderRadius:10}}>
            <View style={{borderWidth:0,width:80,height:80,borderRadius:40,backgroundColor:'white'}}>
            </View>
          </View>
          <View style={{borderWidth:0,width:230,height:100,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>นายธัญญ์ภูวิศ ธัญณัฐสิทธิ์</Text>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:16}}>พนักงานทั่วไป</Text>
          </View>
        </View>
      </View>
      <View style={{width:330,height:1,backgroundColor:'black',alignSelf:'center'}}></View>
      <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
        <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>งานที่ได้รับมอบหมาย</Text>
      </View>
      <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
        <TouchableOpacity style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center'}}
          onPress={()=>{
            navigation.navigate('Mechanic_Select')
          }}
        >
          <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>ตรวจเช็คสภาพรถยนต์</Text>
        </TouchableOpacity>

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
