import {configureStore} from '@reduxjs/toolkit'
import isLoadingReducer from './isLoadingSlice';
import notificationReducer from './notificationSlice'

export default configureStore({
    reducer: {
        isLoading: isLoadingReducer,
        notification: notificationReducer
    }
})