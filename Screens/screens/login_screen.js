import { View,Text,TouchableOpacity,Image,StyleSheet,ScrollView,SafeAreaView,ImageBackground,TextInput,Alert } from 'react-native'

// import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProfile } from '../../redux/authSlice'
import * as AuthModel from '../../firebase/authModel'
import * as UserModel from '../../firebase/userModel'

export const LoginScreen = ({navigation}) => {

  const [credential, setCredential] = useState({ username: '', password: '' })
  const setUsername = (text) => {
    setCredential(oldValue => ({
      ...oldValue,
      username: text
    }))
  }

  const setPassword = (text) => {
    setCredential(oldValue => ({
      ...oldValue,
      password: text
    }))
  }
  const dispatch = useDispatch()

  const success = (doc) => {
    //console.log(`user data = ${doc.data().username}`)
    let profile_state = {
      'id': doc.id,
      'username': doc.data().username,
      'firstname': doc.data().firstname,
      'lastname': doc.data().lastname,
      'role': doc.data().role,
      'firstVehicleId': doc.data().firstVehicleId,
      'lastVehicleId': doc.data().lastVehicleId,
    }
    dispatch(addProfile(profile_state))

    if(doc.data().role='customer'){
      navigation.navigate({name:'Home'})
    }
   




    // navigation.navigate({
    //   name: 'Home',
    //   params: {
    //     username: doc.data().username
    //   }
    // })
    // navigation.navigate({
    //   name:'MainDrawer',
    //   params: {
    //     username:item.username
    //   }
    // })
  }

  const unsuccess = (msg) => {
    //console.log(msg)
    Alert.alert(msg)
  }

  const signInSuccess = (username) => {
    //console.log(`sign in success user = ${username}`)
    UserModel.getUserByUsername(username, success, unsuccess)
  }

  const onSignInPress = () => {
    AuthModel.singInEmailPass(credential.username, credential.password, signInSuccess, unsuccess)
    // if(authList.length > 0){
    //   let user = authList.find((item) => {
    //     return item.username == credential.username && item.password == credential.password
    //   })
    //   console.log(`user: ${user}`)
    //   if(user != undefined)
    //     success(user)
    //   else
    //     unsuccess('Wrong username or password')
    // }else{
    //   unsuccess(`No user in system yet`)
    // }
  }

  const onSignUpPress = () => {
    //navigation.push('Register')
  }



  const [profile,setProfile] = useState({'username':'','password':'','nickname':''})

  const setUsernameRegis = (text) => {
    setProfile(oldValue => ({
      ...oldValue,
      username:text
    }))
  }

  const setPasswordRegis = (text) => {
    setProfile(oldValue => ({
      ...oldValue,
      password:text
    }))
  }

  const setNicknameRegis = (text) => {
    setProfile(oldValue => ({
      ...oldValue,
      nickname:text
    }))
  }

  const allSuccess = (doc) => {
    Alert.alert(`สมัครสมาชิกสำเร็จ`)
    setProfile({'username':'','password':'','nickname':''})
    setLoginTabUsed(true)
    setRegisterTabUsed(false)
  }

  const addToDBsuccess = (docID) => {
    //console.log(docID)
    UserModel.getUserByDocID(docID, allSuccess, unsuccess)
  }

  const createUserSuccess = (user) => {
    //console.log(`create user success : ${user.email}`)

    //add to firestore
    UserModel.addUser(user.email, profile, addToDBsuccess, unsuccess)
  }

  const onRegisterPress = () => {
    // console.log(`profile ${profile.firstname}`)
    // dispatch(addProfile(profile))
    // allSuccess(profile)
    AuthModel.signUpEmailPass(profile.username, profile.password, createUserSuccess, unsuccess)
  }

  const onCancelPress = () => {
  }















































  const [loginTabUsed,setLoginTabUsed] = useState(true)
  const [registerTabUsed,setRegisterTabUsed] = useState(false)

  const loginOrRegisterTab = () => {
    if(loginTabUsed){
      return (  
        <View style={{flexDirection:'row'}}>
          <View style={{width:120,height:50,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'white'}}>
              <Text style={{fontFamily:'Sound-Rounded',color:'white',fontSize:20}}>เข้าสู่ระบบ</Text>
          </View>
          <TouchableOpacity style={{width:120,height:50,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'white',opacity:0.2}}
                onPress={()=>{
                  setLoginTabUsed(false)
                  setRegisterTabUsed(true)
                }}
              >
                  <Text style={{fontFamily:'Sound-Rounded',color:'white',fontSize:20}}>สมัครสมาชิก</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if(registerTabUsed){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{width:120,height:50,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'white',opacity:0.2}}
            onPress={()=>{
              setLoginTabUsed(true)
              setRegisterTabUsed(false)
            }}
          >
              <Text style={{fontFamily:'Sound-Rounded',color:'white',fontSize:20}}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
          <View style={{width:120,height:50,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'white'}}>
            <Text style={{fontFamily:'Sound-Rounded',color:'white',fontSize:20}}>สมัครสมาชิก</Text>
          </View>
        </View>
      )
    }
  }

  
  const loginOrRegisterPanel = () => {
    if(loginTabUsed){
      return (
        <View style={{}}>
          <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'#787878'}}>อีเมล</Text>
          <TextInput style={{width:200,height:35,backgroundColor:'#787878',color:'white',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10}}
            placeholder='email@example.com'
            value={credential.username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'#787878'}}>รหัสผ่าน</Text>
          <TextInput style={{width:200,height:35,backgroundColor:'#787878',color:'white',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10}}
            secureTextEntry={true}
            placeholder='password'
            value={credential.password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      )
    }
    if(registerTabUsed){
        return (
          <View>
            <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'#787878'}}>อีเมล</Text>
            <TextInput style={{width:200,height:35,backgroundColor:'#787878',color:'white',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10}}
              placeholder='email@example.com'
              value={profile.username}
              onChangeText={(text) => setUsernameRegis(text)}
            />
            <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'#787878'}}>รหัสผ่าน</Text>
            <TextInput style={{width:200,height:35,backgroundColor:'#787878',color:'white',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10}}
              secureTextEntry={true}
              placeholder='password'
              value={profile.password}
              onChangeText={(text) => setPasswordRegis(text)}
            />
            <Text style={{fontFamily:'Sound-Rounded',fontSize:14,color:'#787878'}}>ชื่อเล่น</Text>
            <TextInput style={{width:200,height:35,backgroundColor:'#787878',color:'white',fontFamily:'Sound-Rounded',borderRadius:12,paddingLeft:10}}
              placeholder='nickname'
              value={profile.nickname}
              onChangeText={(text) => setNicknameRegis(text)}
            />
        </View>
        )
    }
  }

  const loginOrRegisterButton = () => {
    if(loginTabUsed){
      return (
        <View>
          <TouchableOpacity style={{width:120,height:50,backgroundColor:'#00BE4C',borderRadius:20,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{onSignInPress()}}
          >
            <Text style={{fontFamily:'Sound-Rounded',fontSize:16,color:'white'}}>ลงชื่อเข้าใช้</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if(registerTabUsed){
      return (
        <View>
          <TouchableOpacity style={{width:120,height:50,backgroundColor:'#FF9900',borderRadius:20,justifyContent:'center',alignItems:'center'}}
            onPress={()=>{onRegisterPress()}}
          >
            <Text style={{fontFamily:'Sound-Rounded',fontSize:16,color:'white'}}>สมัครสมาชิก</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <ImageBackground source={{uri:'https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif'}} style={{flex:1,backgroundColor:'black',justifyContent:'center',alignItems:'center',}}>
      <View style={{width:280,height:350,backgroundColor:"#292A31",borderRadius:30,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:0.5,borderWidth:0,borderColor:'red',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          { loginOrRegisterTab() }

        </View>
        <View style={{flex:1,borderWidth:0,borderColor:'red',justifyContent:'center',alignItems:'center'}}>
          { loginOrRegisterPanel() }
        </View>
        <View style={{flex:0.5,borderWidth:0,borderColor:'red',justifyContent:'center',alignItems:'center'}}>
          { loginOrRegisterButton() }
        </View>
      </View>
    </ImageBackground>
  )
}
