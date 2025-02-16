"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllNewsletter, deleteNewsletter } from "@/app/services/newsletter";
import { format } from "date-fns";
import Swal from "sweetalert2";

const columns = [
  { id: "email", label: "Email", minWidth: 170 },
  { id: "createdAt", label: "Abonné le", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 70, align: "right" },
];

const formatDate = (dateString) =>
  format(new Date(dateString), "dd/MM/yyyy - HH:mm");

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [newsletter, setNewsletter] = React.useState([]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNewsletter(id)
          .then(() => {
            Swal.fire("Deleted!", "This email has been deleted.", "success");
            setNewsletter(
              newsletter.filter((newsletter) => newsletter._id !== id)
            );
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

  // Fetch the newsletter data from the API
  const fetchNewsletter = async () => {
    try {
      const response = await getAllNewsletter();
      setNewsletter(response.data.newsletters);

    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchNewsletter();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDownloadAll = () => {
    const emails = newsletter.map((newsletter) => newsletter.email).join("\n");
    const element = document.createElement("a");
    const file = new Blob([emails], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "all_newsletter_emails.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      <button className="cat-add-product" onClick={handleDownloadAll}>
        Télécharger la liste
      </button>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {newsletter.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Aucun email trouvé
                  </TableCell>
                </TableRow>
              ) : (
                newsletter
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          if (column.id === "action") {
                            return (
                              <TableCell key={column.id}>
                                <button
                                  onClick={() => handleDelete(row._id)}
                                  style={{
                                    color: "red",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "none",
                                  }}
                                >
                                  Supprimer
                                </button>
                              </TableCell>
                            );
                          }
                          const value =
                            column.id === "createdAt"
                              ? formatDate(row[column.id])
                              : row[column.id];
                          return <TableCell key={column.id}>{value}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={newsletter.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
