import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert,FlatList} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { Entypo } from '@expo/vector-icons';


import * as WorkModel from '../../firebase/workModel'

export const Head_Mechanic_Setprice_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)

  const goBoss_set_price_success = (data) =>{
    // console.log(data)
    navigation.navigate({name:'Head_Mechanic_Setprice_1',params:data})
  }
  const goBoss_set_price_unsuccess = (msg) =>{

  }
  const goBossSetPricePage = (info) => {
    WorkModel.getWorks(info,'setprice',goBoss_set_price_success,goBoss_set_price_unsuccess)
  }

  const [input,setInput] = useState()


  const submit = () => {
    // console.log(workInfo)
    // console.log(info)
    WorkModel.submitWorks(Info.profile,workInfo,input,'check')
    navigation.navigate({name:'Home'})
  }


  let list_product = []

  const productPanel = (list_product) => {
    return (
        <FlatList
            data={list_product}
            renderItem={({item})=> renderCard(item)}
        />
    )
  }


  const renderCard = (item) => {
    return (
        <View style={{width:'100%',height:40,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
              <ScrollView>
                <Text style={{borderWidth:0,fontSize:15,color:'gray',margin:10,fontFamily:'Sound-Rounded'}}>{workInfo.fix_info}</Text>
              </ScrollView>
        </View>
      )
  };



  let workInfo = route.params

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goBossSetPricePage(Info.profile)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ประเมินราคา</Text>
      </View>

    <View style={{borderWidth:1,justifyContent:'center',alignItems:'center'}}>
       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center',margin:10}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.plate}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:150,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>
          <View style={{flex:1,borderWidth:0,width:'90%'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>รายงานการซ่อมแซม</Text>
            <View style={{width:'100%',height:100,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
              <ScrollView>
                <Text style={{borderWidth:0,fontSize:15,color:'gray',margin:10,fontFamily:'Sound-Rounded'}}>{workInfo.fix_info}</Text>
              </ScrollView>
            </View>
          </View>


        </View>
      </View>

      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'space-between',alignItems:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF',flexDirection:'row'}}>
          <View style={{borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>รายการ</Text>
          </View>
          
          <TouchableOpacity style={{borderWidth:0,width:40,height:40,marginRight:10,borderRadius:10,backgroundColor:'#FFB156',justifyContent:'center',alignItems:'center'}}>
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{borderWidth:0,width:'90%',height:180,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF',marginBottom:10}}>
          <View style={{flex:1,borderWidth:0,width:'90%',margin:10}}>
            <ScrollView style={{borderWidth:1}}>
            <View style={{width:'100%',height:40,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
              <ScrollView>
                <Text style={{borderWidth:0,fontSize:15,color:'gray',margin:10,fontFamily:'Sound-Rounded'}}>{workInfo.fix_info}</Text>
              </ScrollView>
            </View>
            </ScrollView>
          </View>
            
        </View>
      </View>
      <View style={{borderWidth:0,width:'90%',flexDirection:'row',justifyContent:'flex-end'}}>
        <TouchableOpacity style={{borderWidth:0,width:120,height:50,borderRadius:20,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center'}}>
            <Text style={{borderWidth:0,fontSize:25,color:'white',fontFamily:'Sound-Rounded'}}>ยืนยัน</Text>
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
