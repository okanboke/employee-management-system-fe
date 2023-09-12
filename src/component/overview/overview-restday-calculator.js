import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CalculateIcon from '@mui/icons-material/Calculate';



export const OverviewRestDayCalculator = (props) => {
    const { difference, positive = false, sx, restDayCalc } = props;
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
                Hesaplanan İzin Günü
              </Typography>
              <Typography variant="h4">
                {restDayCalc}
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
                <CalculateIcon />
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
                Bayram ve Resmi Tatiller Hariç!
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    );
  };
  
  OverviewRestDayCalculator.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object
    };
  