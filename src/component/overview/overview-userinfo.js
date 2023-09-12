import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Home from '../Home/Home';
import EngineeringIcon from '@mui/icons-material/Engineering';


export const OverviewUserInfo = (props) => {
    const { difference, positive = false, sx,  firstName, lastName } = props;
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
                Personel
              </Typography>
              <Typography variant="h5" align="inherit">
                Hoşgeldiniz
                <Typography variant='h5'>{firstName + " " + lastName}</Typography>
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
                <EngineeringIcon />
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
  
  OverviewUserInfo.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object
    };
  