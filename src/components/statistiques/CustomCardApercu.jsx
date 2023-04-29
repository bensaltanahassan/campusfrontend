import {
  Avatar,
  ButtonBase,
  Grid,
  Icon,
  Stack,
  Typography,
} from "@mui/material";

function CustomCardApercu(props) {
  return (
    <Grid item xs={6}>
      <Stack
        direction="row"
        sx={{
          border: "1px solid #eaeaea",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: props.backgroundColor,
          height: { xs: "150px", sm: "110px", md: "80px" },
        }}
      >
        <ButtonBase
          disabled={!props.enabled}
          onClick={props.onClick}
          sx={{
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
            }}
          >
            <Avatar
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#231942",
              }}
            >
              <Icon>{props.icon}</Icon>
            </Avatar>
            <Stack
              direction="column"
              sx={{
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {props.number}
              </Typography>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {props.text}
              </Typography>
            </Stack>
          </Stack>
        </ButtonBase>
      </Stack>
    </Grid>
  );
}

export default CustomCardApercu;
