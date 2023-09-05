import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Home from '../Home/Home';
import WorkIcon from '@mui/icons-material/Work';


export const OverviewUserCreateDay = (props) => {
    const { difference, positive = false, sx, userDate } = props;
    return (
      <Card sx={sx}>
        <CardContent>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                variant="overline"
              >
                İşe Giriş Tarihi
              </Typography>
              <Typography variant="h5">
                {userDate}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "#6120ff",
                height: 56,
                width: 56
              }}
            >
              <SvgIcon>
                <WorkIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
          {difference && (
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={0.5}
              >
                 <SupervisorAccountIcon></SupervisorAccountIcon>
              </Stack>
              <Typography
                color="text.secondary"
                variant="caption"
              >
                Yönetici dahil
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    );
  };
  
  OverviewUserCreateDay.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object
    };
  