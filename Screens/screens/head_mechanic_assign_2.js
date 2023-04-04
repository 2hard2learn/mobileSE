import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,TextInput, ScrollView,Alert,FlatList} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


import * as WorkModel from '../../firebase/workModel'

export const Head_Mechanic_Assign_2 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)

  const mechanic_assign_success = (data) => {
    //console.log(data)
    navigation.navigate({name:'Head_Mechanic_Assign_1',params:data})
  }
  const mechanic_assign_unsuccess = (msg) => {
    Alert.alert(msg)
  }

  const goMechanicAssignPage = (info) => {
    // console.log(info)
    // console.log('tt')
    WorkModel.getWorks(info,'assign',mechanic_assign_success,mechanic_assign_unsuccess)
  }


  let workInfo = route.params.work
  let employeeInfo = route.params.data

//   console.log(employeeInfo)
//   console.log(employeeInfo)
//   console.log(route.params)

  const whatWork = (status) => {
    if(status=='รอมอบหมายตรวจสภาพ'){
        return 'มอบหมายงานตรวจสภาพ'
    }
    else{
        return 'มอบหมายงานซ่อมแซม'
    }
  }

  const giveWorkSuccess = () => {
    navigation.navigate({name:'Home'})
  }
  const giveWorkUnsuccess = () => {
    
  }

  const selectEmployee = (item) => {
    // console.log(workInfo)
    // console.log(item)
    WorkModel.giveWork(workInfo,item,giveWorkSuccess,giveWorkUnsuccess)
  }



  const renderCard = (item) => {
    return (
        <TouchableOpacity style={{borderWidth:0,width:330,height:60,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center'}}
          onPress={()=>{
              // console.log(item)
            //   goHeadMechanicAssignPage(item)
            selectEmployee(item)
            // navigation.navigate({name:'Head_Mechanic_Assign_2',params:item})
          }}
        >
          <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>{item.Name+' '+item.LastName}</Text>
        </TouchableOpacity>
    )
  }

  const renderSeparator = () => (
    <View style={{ padding: 8 }} />
  )

  return (
    <View style={{flex:1,justifyContent:'space-between',paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              goMechanicAssignPage(Info.profile)
            }}
            
          >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{whatWork(workInfo.status)}</Text>
      </View>


       
      <View style={{width:'100%',borderWidth:0  ,justifyContent:'center',alignItems:'center'}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.plate}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:150,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>

          <View style={{flex:1,borderWidth:0,width:'90%',justifyContent:'center'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>รายละเอียด</Text>
            <View style={{width:'100%',height:100,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
              <ScrollView>
                <Text style={{borderWidth:0,fontSize:15,color:'gray',fontFamily:'Sound-Rounded',margin:10}}>{workInfo.symptom}</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>

      <View style={{borderWidth:0,height:40,justifyContent:'center'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'#05C3FF',fontFamily:'Sound-Rounded',marginLeft:10}}>เลือกพนักงาน</Text>
      </View>

      <View style={{borderWidth:0,height:300,justifyContent:'center',alignItems:'center'}}>
        <FlatList
        data={employeeInfo}
        renderItem={({item}) => renderCard(item)}
        keyExtractor={item => item.UID}
        ItemSeparatorComponent={renderSeparator}
        />
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
