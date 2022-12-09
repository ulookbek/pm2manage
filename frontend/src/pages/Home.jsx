import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ServersTable from '../components/Server/ServersTable';

import { fetchServers } from '../redux/slices/servers';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { servers } = useSelector((state) => state.servers);

  const isPostsLoading = servers.status === 'loading';
  const isTagsLoading = servers.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchServers());
  }, []);

  console.log("posts: ", servers)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Сервера" />
        <Tab label="Вкладка 2" disabled/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
            <ServersTable servers={servers}/>
        </Grid>
        <Grid xs={4} item>
        </Grid>
      </Grid>
    </>
  );
};
