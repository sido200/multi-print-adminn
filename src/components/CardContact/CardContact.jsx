import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllContact, deleteContact } from "@/app/services/contact";
import Swal from "sweetalert2";

// Define the columns with correct 'id' that matches the data keys
const columns = [
  { id: "name", label: "Nom", minWidth: 120 },
  { id: "firstname", label: "Prénom", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 180, align: "left" },
  { id: "phone", label: "Numéro de tél.", minWidth: 130, align: "left" },
  { id: "message", label: "Message", minWidth: 190, align: "left" },
  { id: "action", label: "Action", minWidth: 70, align: "right" },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [contact, setContact] = React.useState([]);

  // Handle contact deletion
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContact(id)
          .then(() => {
            Swal.fire("Deleted!", "Your contact has been deleted.", "success");
            setContact(contact.filter((contact) => contact._id !== id));
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
            });
          });
      }
    });
  };

  // Fetch contact data on component mount
  const fetchContact = async () => {
    try {
      const response = await getAllContact();
      setContact(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchContact();
  }, []);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contact.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Pas de messages
                </TableCell>
              </TableRow>
            ) : (
              contact
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value =
                        column.id === "action" ? (
                          <TableCell
                            key={column.id}
                            align="right" // Ensure the delete button is aligned to the right
                          >
                            <button
                              onClick={() => handleDelete(row._id)}
                              style={{
                                cursor: "pointer",
                                color: "red",
                                border: "none",
                                background: "none",
                              }}
                            >
                              Delete
                            </button>
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id]}
                          </TableCell>
                        );
                      return value;
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contact.length} // Total rows count
        rowsPerPage={rowsPerPage} // Rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Page change handler
        onRowsPerPageChange={handleChangeRowsPerPage} // Rows per page change handler
      />
    </Paper>
  );
}
