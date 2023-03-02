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
    addProfile(state,action){
      //console.log(`addProfile is activated = ${action.payload}`)
      // state.push(action.payload)
      state.profile.id = action.payload.id
      state.profile.firstname = action.payload.firstname
      state.profile.lastname = action.payload.lastname
      state.profile.role = action.payload.role
      state.profile.username = action.payload.username
      state.profile.firstVehicleId = action.payload.firstVehicleId
      state.profile.lastVehicleId = action.payload.lastVehicleId
      //console.log(state)
    }
  }
})

const {actions, reducer} = authSlice
export const {addProfile} = actions
export default reducer