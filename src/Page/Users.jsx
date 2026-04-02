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
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { formatDateTime } from "../Components/lib/FormatDateTime";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Fetch Users
  // ---------------------------
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------------------
  // Delete User
  // ---------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await api.delete(`/user/${id}`);
      toast.success(res.data.message || "Deleted successfully");

      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

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

        <Button variant="contained" component={Link} to="/user-settings">
          Create User
        </Button>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last login</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>

                  {/* Role */}
                  <TableCell>
                    <Chip
                      label={user.role?.name || "N/A"}
                      color="primary"
                      size="small"
                    />
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {user.isActive ? (
                      <Chip label="Active" color="success" size="small" />
                    ) : (
                      <Chip label="Inactive" color="error" size="small" />
                    )}
                  </TableCell>
                  <TableCell>{formatDateTime(user?.lastLogin)}</TableCell>

                  {/* Actions */}
                  <TableCell
                    align="center"
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/user-settings/${user._id}`}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
