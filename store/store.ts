import {configureStore} from '@reduxjs/toolkit'
import isLoadingReducer from './isLoadingSlice';
import notificationReducer from './notificationSlice'
import settingSlice from './settingSlice';

export default configureStore({
    reducer: {
        isLoading: isLoadingReducer,
        notification: notificationReducer,
        setting: settingSlice
    }
})