import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
    _id: string | null;
    email: string | null;
    mobile: string | null;
    fullName?: string | null;
    dob?: string | null;
    address?: string | null;
    duration?: string | null;
    about?: string | null;
    employmentStatus?: string | null;
    savings?: string | null;
}

const initialState: UserInfo = {
    _id: null,
    email: null,
    mobile: null,
    fullName: null,
    dob: null,
    address: null,
    duration: null,
    about: null,
    employmentStatus: null,
    savings: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<UserInfo>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.mobile = action.payload.mobile;
        },
        addPersonalInfo: (state, action: PayloadAction<UserInfo>) => {
            state.fullName = action.payload.fullName;
            state.dob = action.payload.dob;
            state.address = action.payload.address;
            state.duration = action.payload.duration;
            state.about = action.payload.about;
        },
        addFinancialInfo: (state, action: PayloadAction<UserInfo>) => {
            state.employmentStatus = action.payload.employmentStatus;
            state.savings = action.payload.savings;
        },
        removeData: (state) => {
            state._id = null;
            state.email = null;
            state.mobile = null;
            state.fullName = null;
            state.dob = null;
            state.address = null;
            state.duration = null;
            state.about = null;
            state.employmentStatus = null;
            state.savings = null;
        }
    }
});

export const { addAccount, addPersonalInfo, addFinancialInfo, removeData } = userSlice.actions;

export default userSlice.reducer;
