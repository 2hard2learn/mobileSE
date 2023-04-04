import {createSlice} from '@reduxjs/toolkit'
const initialState = {
  // profile:[]
  profile:{
    
  }
}
 
const authSlice = createSlice({
  name:'auths',
  initialState:initialState,
  // initialState:initialState.profile,
  reducers:{
    addProfileUser(state,action){
      //console.log(`addProfile is activated = ${action.payload}`)
      // state.push(action.payload)
      // state.profile.id = action.payload.id
      // state.profile.firstname = action.payload.firstname
      // state.profile.lastname = action.payload.lastname
      // state.profile.role = action.payload.role
      // state.profile.email = action.payload.email
      // state.profile.firstVehicleId = action.payload.firstVehicleId
      // state.profile.lastVehicleId = action.payload.lastVehicleId
      state.profile.CarModel = action.payload.CarModel
      state.profile.LastName = action.payload.LastName
      state.profile.Name = action.payload.Name
      state.profile.PhoneNumber = action.payload.PhoneNumber
      state.profile.UID = action.payload.UID
      state.profile.role = action.payload.role
      // state.profile.status = action.payload.status
      //console.log(state)
    },
    addProfileEmployee(state,action){
      state.profile.LastName = action.payload.LastName
      state.profile.Name = action.payload.Name
      state.profile.PhoneNumber = action.payload.PhoneNumber
      state.profile.UID = action.payload.UID
      state.profile.garage = action.payload.garage
      state.profile.image = action.payload.image
      state.profile.role = action.payload.role
    }
  }
})

const {actions, reducer} = authSlice
export const {addProfileUser,addProfileEmployee} = actions
export default reducer