import { configureStore } from '@reduxjs/toolkit';
import { serversReducer } from './slices/servers';
import { authReducer } from './slices/auth';

const store = configureStore({
  reducer: {
    servers: serversReducer,
    auth: authReducer,
  },
});

export default store;
