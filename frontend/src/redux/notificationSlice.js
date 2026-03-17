// import { createSlice } from "@reduxjs/toolkit";

// const notificationSlice = createSlice({
//     name: "notification",
//     initialState: {
//         notifications: []   // ✅ must be array
//     },
//     reducers: {
//         setNotifications: (state, action) => {
//             state.notifications = action.payload || [];
//         }
//     }
// });

// export const { setNotifications } = notificationSlice.actions;
// export default notificationSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: []
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        markNotificationRead: (state, action) => {
            const id = action.payload;
            const notification = state.notifications.find(n => n._id === id);
            if (notification) notification.read = true;
        },
        deleteNotificationFromState: (state, action) => {
            state.notifications = state.notifications.filter(
                n => n._id !== action.payload
            );
        }
    }
});

export const {
    setNotifications,
    markNotificationRead,
    deleteNotificationFromState
} = notificationSlice.actions;

export default notificationSlice.reducer;