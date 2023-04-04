import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button,TouchableOpacity,FlatList} from 'react-native';
import React from 'react'
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card, Paragraph, Title } from 'react-native-paper'
import { useState,useEffect,createContext } from 'react'
import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
const CardContext = createContext()


export const Owner_History_1 = ({navigation,route}) => {
  const Info = useSelector((state) => state.auths)
  let Work = route.params
  //console.log(Work)


  const whatWork = (status) => {
    if(status=='ตรวจสภาพแล้ว_รอยืนยัน'){
      return 'รายงานตรวจสภาพ'
    }
    if(status=='ซ่อมแล้ว_รอยืนยัน'){
      return 'รายงานซ่อมแซม'
    }
  }

  // const confirmWorkSuccess = () => {
  //   navigation.navigate({name:'Head_Mechanic_Confirm_2'})
  // }

  // const confirmWorkUnsuccess = () => {

  // }


  // const goHeadMechanicConfirm2Page = (item) => {
  //   WorkModel.confirm
  // }

  const renderCard = (item) => {
    return (
        <View style={{flexDirection:'row'}}>
            <View style={{borderWidth:0,width:290,height:75,backgroundColor:'#0DD08A',borderTopLeftRadius:5,borderBottomLeftRadius:5,justifyContent:'center'}}
            onPress={()=>{
                // console.log(item)
                //   goHeadMechanicAssign2Page(item)
                // navigation.navigate({name:'Head_Mechanic_Assign_2',params:item})
            }}
            >
            <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>{item.plate}</Text>
            </View>
            <TouchableOpacity style={{borderWidth:0,width:40,height:75,borderTopRightRadius:5,borderBottomRightRadius:5,backgroundColor:'#0CBF7F',justifyContent:'center',alignItems:'center'}}
                onPress={()=>{
                    // goOwnerEditAccount2Page(item)
                    // console.log(Work)
                    navigation.navigate({name:'Owner_History_2',params:item})
                }}
            >
                <MaterialIcons name="description" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
  }

  const renderSeparator = () => (
    <View style={{ padding: 8 }} />
  )

  const progressOrNot = () => {
    let total = 0
    Work.forEach((item)=>{
      total=total+1
    })
    if(total>0){
      return (
        <FlatList
          data={Work}
          renderItem={({item}) => renderCard(item)}
          keyExtractor={item => item.workId}
          ItemSeparatorComponent={renderSeparator}
        />
      )
    }
    else{
      return (
        <View style={{flex:1,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#A1A1A1'}}>ไม่มีประวัติงานในตอนนี้</Text>
        </View>
      )
    }
  }

  return (
    <View style={{flex:1,paddingTop: Constants.statusBarHeight}}>

      <View style={{height:80,backgroundColor:'#05C3FF',alignItems:'center',flexDirection:'row'}}>
        <TouchableOpacity style={{width:50,height:50,backgroundColor:'#FFA133',marginLeft:10,borderRadius:10,justifyContent:'center',alignItems:'center'}}
          onPress={()=>{
            navigation.navigate({name:'Home'})
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>ประวัติงานทั้งหมด</Text>
      </View>

      <View style={{height:50,borderWidth:0,justifyContent:'center'}}>
        <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#05C3FF',marginLeft:10}}>งานที่เสร็จแล้วทั้งหมด</Text>
      </View>
       
      <View style={{flex:1,borderWidth:0,alignItems:'center'}}>
      {progressOrNot()}
          {/* <FlatList
              data={Work}
              renderItem={({ item }) => renderCard(item)}
              keyExtractor={item => item.mechanic}
              // ItemSeparatorComponent={renderSeparator}
              style={{borderWidth:0,borderColor:'red',width:350,alignItems:'center'}}
            /> */}
        {/* <View style={{borderWidth:0,width:330,height:75,backgroundColor:'#FFB156',borderRadius:5,justifyContent:'center'}}>
          <Text style={{fontFamily:'Sound-Rounded',fontSize:20,color:'white',marginLeft:10}}>กท-3333</Text>
        </View>
        <View style={{flex:1,borderWidth:0,justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontFamily:'Sound-Rounded',fontSize:25,color:'#A1A1A1'}}>ไม่มีงานในตอนนี้</Text>
        </View> */}
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
