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
  let workInfo = route.params

  const goBoss_set_price_success = (data) =>{
    // console.log(data)
    navigation.navigate({name:'Head_Mechanic_Setprice_1',params:data})
  }
  const goBoss_set_price_unsuccess = (msg) =>{

  }
  const goBossSetPricePage = (info) => {
    WorkModel.getWorks(info,'setprice',goBoss_set_price_success,goBoss_set_price_unsuccess)
  }


  const addBillSuccess = () => {
    navigation.navigate({name:'Home'})
    Alert.alert('ทำรายการสำเร็จ')
  }

  const onSubmitPress = (work) => {
    WorkModel.addBill(Info.profile,work,product_list,addBillSuccess)
  }

  const [product,setProduct] = useState('')
  const [price,setPrice] = useState('')
  // const [product_list,setProduct_list] = useState()
  const [product_list,setProduct_list] = useState([])
  const addProduct = (product,price) => {
    let total_product = 0
    product_list.forEach((item)=>{
      total_product = total_product + 1
    })
    if(total_product<4){
      product_list.push({'title':product,'amount':price})
    }
    else{
      Alert.alert('เกินจำนวนสูงสุดที่รับได้')
    }
    // console.log(product_list)
    setProduct('')
    setPrice('')
  }

  const productPanel = (product_list) => {
    let total_product = 0
    product_list.forEach((item)=>{
      total_product = total_product + 1
    })
    if(total_product==0){
      return 
    }
    if(total_product==1){
      return (
        <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center'}}>
          <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
          <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

              >{product_list[0].title}</Text>
          </View>
          <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
          <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

              >{product_list[0].amount}</Text>
          </View>
        </View>
      )
    }
    if(total_product==2){
      return (
        <View>
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[0].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[0].amount}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>2.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[1].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[1].amount}</Text>
            </View>
          </View>
        </View>
      )
    }
    if(total_product==3){
      return (
        <View>
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[0].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[0].amount}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>2.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[1].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[1].amount}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>3.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[2].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[2].amount}</Text>
            </View>
          </View>
        </View>
      )
    }
    if(total_product==4){
      return (
        <View>
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>1.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[0].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[0].amount}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>2.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[1].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[1].amount}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>3.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[2].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[2].amount}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-around',alignItems:'center',borderWidth:0}}>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>4.</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[3].title}</Text>
            </View>
            <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded'}}>ราคา</Text>
            <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

                >{product_list[3].amount}</Text>
            </View>
          </View>
        </View>
      )
    }
    else{
      return (
        <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
              <Text style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}

              ></Text>
          </View>
      )
    }
  }


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

    <View style={{borderWidth:0,justifyContent:'center',alignItems:'center'}}>
       
      <View style={{width:'100%',borderWidth:0,justifyContent:'center',alignItems:'center',margin:10}}>
        <View style={{borderWidth:0,width:'90%',height:60,justifyContent:'center',borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'#05C3FF'}}>
          <Text style={{borderWidth:0,fontSize:25,color:'white',marginLeft:20,fontFamily:'Sound-Rounded'}}>{workInfo.plate}</Text>
        </View>
        <View style={{borderWidth:0,width:'90%',height:120,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF'}}>
          <View style={{flex:1,borderWidth:0,width:'90%'}}>
            <Text style={{borderWidth:0,fontSize:20,color:'white',fontFamily:'Sound-Rounded'}}>รายงานการซ่อมแซม</Text>
            <View style={{width:'100%',height:70,borderWidth:0,borderRadius:10,backgroundColor:'white'}}>
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
        </View>
        <View style={{borderWidth:0,width:'90%',height:250,justifyContent:'center',alignItems:'center',borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:'#69DBFF',marginBottom:10}}>
          <View style={{flex:1,borderWidth:0,width:'90%',margin:10}}>
            <View style={{borderWidth:0,flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{borderWidth:0}}>
                        <Text style={{borderWidth:0,fontSize:15,color:'white',fontFamily:'Sound-Rounded'}}>ชื่อรายการ</Text>
                        <View style={{borderWidth:0,backgroundColor:'white',width:130,height:30,borderRadius:10,justifyContent:'center'}}>
                            <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}}
                                placeholder='ชื่อรายการ'
                                value={product}
                                onChangeText={(text)=>{
                                    setProduct(text)
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={{borderWidth:0,marginLeft:10}}>
                        <Text style={{borderWidth:0,fontSize:15,color:'white',fontFamily:'Sound-Rounded'}}>ราคา</Text>
                        <View style={{borderWidth:0,backgroundColor:'white',width:80,height:30,borderRadius:10,justifyContent:'center'}}>
                            <TextInput style={{borderWidth:0,fontSize:14,color:'gray',fontFamily:'Sound-Rounded',marginLeft:5}} keyboardType='decimal-pad' inputMode='numberic'
                                placeholder='ราคา'
                                value={price}
                                onChangeText={(text)=>{
                                    setPrice(text)
                                }}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={{borderWidth:0,justifyContent:'flex-end',marginLeft:10}}>
                        <TouchableOpacity style={{borderWidth:0,width:60,height:30,marginRight:10,borderRadius:10,backgroundColor:'#FFB156',justifyContent:'center',alignItems:'center'}}
                          onPress={()=>{
                            addProduct(product,price)
                          }}
                        >
                            <Text style={{borderWidth:0,fontSize:15,color:'white',fontFamily:'Sound-Rounded'}}>เพิ่ม</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <View style={{borderWidth:0,}}>
              {productPanel(product_list)}
            </View>
          
          </View>
            
        </View>
      </View>
      <View style={{borderWidth:0,width:'90%',flexDirection:'row',justifyContent:'flex-end'}}>
        <TouchableOpacity style={{borderWidth:0,width:120,height:50,borderRadius:20,backgroundColor:'#00D662',justifyContent:'center',alignItems:'center'}}
            onPress={()=>{
              onSubmitPress(workInfo)
            }}
        >
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
