const { createSlice } = require("@reduxjs/toolkit");

const bankSlice = createSlice({
    name: "banking",
    initialState: {
        recieverId:""
    },
    reducers: {
        set(state, action) {
            return { ...state, recieverId: action.payload};
        }
    }
});

export const { set } = bankSlice.actions;
export const bankReducer = bankSlice.reducer;