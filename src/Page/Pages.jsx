import { useContext, useEffect, useState } from "react";
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
import axios from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { DataContext } from "../DataProcessing/DataProcessing";
import { hasPermission } from "../Components/lib/hasPermission";

export default function Pages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(DataContext);
  // 🔥 Flatten tree into table format
  const flattenPages = (data, level = 0, parentOrder = "") => {
    let result = [];

    data.forEach((item, index) => {
      const orderPrefix = parentOrder
        ? `${parentOrder}.${index + 1}`
        : `${index + 1}`;

      result.push({
        ...item,
        level,
        displayOrder: orderPrefix,
      });

      if (item.children?.length) {
        result = result.concat(
          flattenPages(item.children, level + 1, orderPrefix),
        );
      }
    });

    return result;
  };

  // 🔁 Fetch pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/get-all-pages");

      const flat = flattenPages(res.data || []);
      setPages(flat);
    } catch (error) {
      console.error("Failed to fetch pages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // ❌ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    try {
      const { data } = await axios.delete(`/delete-page/${id}`);
      toast.success(data.message || "Deleted successfully");
      fetchPages();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  const canCreate = hasPermission(
    auth?.permissions,
    "page-settings",
    "canCreate",
  );
  const canUpdate = hasPermission(auth?.permissions, "pages", "canUpdate");
  const canDelete = hasPermission(auth?.permissions, "pages", "canDelete");
  const hasAnyAction = canUpdate || canDelete;
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
        <Typography variant="h5">Pages</Typography>

        {canCreate && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/page-settings"
          >
            Create Page
          </Button>
        )}
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Path</TableCell>
              <TableCell>Menu</TableCell>
              <TableCell>Status</TableCell>
              {hasAnyAction && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : pages.length > 0 ? (
              pages.map((page) => (
                <TableRow key={page._id}>
                  {/* Hierarchical Order */}
                  <TableCell>{page.displayOrder}</TableCell>

                  {/* Name with indentation */}
                  <TableCell>
                    <Box sx={{ pl: page.level * 3 }}>
                      {page.level > 0 && "└── "}
                      {page.name}
                    </Box>
                  </TableCell>

                  <TableCell>{page.slug}</TableCell>
                  <TableCell>{page.path}</TableCell>

                  <TableCell>
                    {page.isMenu ? (
                      <Chip label="Yes" color="success" size="small" />
                    ) : (
                      <Chip label="No" size="small" />
                    )}
                  </TableCell>

                  <TableCell>
                    {page.isActive ? (
                      <Chip label="Active" color="success" size="small" />
                    ) : (
                      <Chip label="Inactive" color="error" size="small" />
                    )}
                  </TableCell>

                  {/* Actions */}
                  {hasAnyAction && (
                    <TableCell
                      align="center"
                      sx={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      {canUpdate && (
                        <Button
                          size="small"
                          variant="outlined"
                          component={Link}
                          to={`/page-settings/${page._id}`}
                        >
                          Edit
                        </Button>
                      )}

                      {canDelete && (
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(page._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No pages found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
