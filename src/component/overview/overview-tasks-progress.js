import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { months, monthsShort, now } from 'moment';

export const OverviewTasksProgress = (props) => {
    const { value, sx } = props;
    let hour = new Date().getHours();


    function getCurrentDate(separator=''){

      let newDate = new Date()
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      
      return `${separator}${date}/${separator}${month<10?`0${month}`:`${month}`}/${year}`
      }
  
    return (
      <Card sx={sx}>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                gutterBottom
                variant="overline"
              >
                Takvim
              </Typography>
              <Typography variant="h4">
                {getCurrentDate()}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
                height: 56,
                width: 56
              }}
            >
              <SvgIcon>
                <CalendarMonthIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
          <Box sx={{ mt: 3 }}>
            <LinearProgress
              value={hour*4.1667}
              variant="determinate"
            />
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  OverviewTasksProgress.propTypes = {
    value: PropTypes.number.isRequired,
    sx: PropTypes.object
  };