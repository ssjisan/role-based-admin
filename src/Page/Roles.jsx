import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  // 🔁 Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ✏️ Edit role
  const handleEdit = (id) => {
    navigate(`/role-settings/${id}`);
  };

  // 🗑️ Delete role
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await api.delete(`/role/${id}`);
      toast.success("Role deleted");
      fetchRoles();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

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

        <Button variant="contained" onClick={() => navigate("/role-settings")}>
          Create Role
        </Button>
      </Box>

      <Box
        sx={{
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: "16px",
          p: 2,
          mt: 3,
          mb: 3,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell>Updated by</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {roles.map((role) => (
                <TableRow key={role._id}>
                  <TableCell>{role.name}</TableCell>

                  <TableCell>{role.permissions?.length || 0} Pages</TableCell>
                  <TableCell>
                    {role?.createdBy?.name ? role?.createdBy?.name : "N/A"}
                  </TableCell>
                  <TableCell>
                    {role?.updatedBy?.name ? role?.updatedBy?.name : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(role._id)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(role._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {roles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No roles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
