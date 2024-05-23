import {configureStore} from '@reduxjs/toolkit'
import UserAuthorReducer from './slices/UserAuthorSlice'

export const Store = configureStore({

    reducer:{
        userAuthorLoginReducer : UserAuthorReducer
    }

})