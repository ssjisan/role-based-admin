import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "../../Components/Icon";
import View from "../../Components/User/View/View";

export default function Users() {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Users</Typography>

        <Button
          variant="contained"
          component={Link}
          to="/user-settings"
          startIcon={<Icon name="Plus" size={20} color="#fff" />}
        >
          Create User
        </Button>
      </Box>
      <View />
    </Box>
  );
}
