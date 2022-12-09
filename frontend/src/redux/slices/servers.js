import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchServers = createAsyncThunk('servers/fetchServers', async () => {
  const { data } = await axios.get('/server/list');
  return data;
});

export const fetchRemoveServer = createAsyncThunk('servers/fetchRemoveServer', async (id) =>
  axios.delete(`/server/${id}`),
);

const initialState = {
  servers: {
    items: [],
    status: 'loading',
  },
};

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение серверов
    [fetchServers.pending]: (state) => {
      state.servers.items = [];
      state.servers.status = 'loading';
    },
    [fetchServers.fulfilled]: (state, action) => {
      state.servers.items = action.payload;
      state.servers.status = 'loaded';
    },
    [fetchServers.rejected]: (state) => {
      state.servers.items = [];
      state.servers.status = 'error';
    },

    // Удаление статьи
    [fetchRemoveServer.pending]: (state, action) => {
      state.servers.items = state.servers.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const serversReducer = serversSlice.reducer;
