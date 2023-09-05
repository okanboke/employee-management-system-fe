import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Home from '../Home/Home';
import KayakingIcon from '@mui/icons-material/Kayaking';



export const OverviewRestDayUsers = (props) => {
    const { difference, positive = false, sx, usersCount, restDay } = props;
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
                Yıllık İzin Günü
              </Typography>
              <Typography variant="h4">
                {restDay}
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
                <KayakingIcon />
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
  
  OverviewRestDayUsers.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object
    };
  