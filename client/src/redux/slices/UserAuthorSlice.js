//create redux slice
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import  axios from "axios";

//make http request using redux-thunk middleware
export const userAuthorLoginThunk = createAsyncThunk('user-author-login', async(userCredObj, thunkApi )=>{
    try{
        if(userCredObj.usertype == 'user'){
            // console.log(res.data)
            const res = await axios.post('http://localhost:4000/user-api/login' , userCredObj);
            if(res.data.message == 'login successful'){
                //store token in local/session storage (these are global objects)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('loginUserStatus', 'true');
                localStorage.setItem('currentUser', JSON.stringify(res.data.user));
                //return data
            }else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data;
        }
        if(userCredObj.usertype == 'author'){
            const res = await axios.post('http://localhost:4000/author-api/login' , userCredObj);
            if(res.data.message == 'login successful'){
                //store token in local/session storage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('loginUserStatus', 'true');
                localStorage.setItem('currentUser', JSON.stringify(res.data.user));

            }else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data;
        }
    }catch(err){
        return thunkApi.rejectWithValue(err.message)
    }
});


export const userAuthorSlice = createSlice({
    name : "user-author-login",
    initialState:{
        isPending:false,
        loginUserStatus: localStorage.getItem('loginUserStatus') === 'true',
        currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
        errorOccurred:false,
        errMsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errorOccurred=false;
            state.errMsg='';
            localStorage.removeItem('loginUserStatus');
            localStorage.removeItem('currentUser');
        },
        restoreAuthState: (state, action) => {
            state.currentUser = action.payload.currentUser;
            state.loginUserStatus = action.payload.loginUserStatus;
        }
    },
    extraReducers: builder=>builder
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user;
        state.loginUserStatus=true;
        state.errMsg=''
        state.errorOccurred=false;
    })
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.loginUserStatus=false;
        state.errMsg=action.payload;
        state.errorOccurred=true;
    }),
})


//export action creator function
export const {resetState} = userAuthorSlice.actions;

// export root reducer of this slice
export default userAuthorSlice.reducer;