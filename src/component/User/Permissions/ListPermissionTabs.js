import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ListJustPermissions from './ListJustPermissions';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display={"block"} sx={{typography: 'body1', marginLeft: "10vh", marginRight: "10vh", marginTop: '10vh'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Mazeret" value="1" />
            <Tab label="Senelik" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><ListJustPermissions></ListJustPermissions></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
}
