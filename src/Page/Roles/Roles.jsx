import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../../Components/Icon";
import View from "../../Components/Roles/View/View";

export default function Roles() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Roles</Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/role-settings")}
          startIcon={<Icon name="Plus" size={20} color="#fff" />}
        >
          Create Role
        </Button>
      </Box>
      <View />
    </Box>
  );
}
