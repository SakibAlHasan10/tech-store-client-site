import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import useGetAllUser from "../../../../hooks/getAllUser/useGetAllUser";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [allUser, , refetch] = useGetAllUser();
  //   console.log(allUser);

  //   product status accept
  const handleProductAccept = (id) => {
    const status = { status: "Accepted" };
    axiosSecure.patch(`/products/${id}`, status).then((res) => {
      //   console.log(id, res.data);

      if (res.data._id) {
        toast.success("Product accepted successfully");
        refetch();
      }
    });
  };
  //   product status reject
  const handleProductReject = (id) => {
    const status = { status: "Rejected" };
    axiosSecure.patch(`/products/${id}`, status).then((res) => {
      //   console.log(id, res.data);

      if (res.data._id) {
        toast.success("Product rejected successfully");
        refetch();
      }
    });
  };
  //   product status reject
  //   const handleProductFeatured = (id) => {
  //     const featured = { featured: true };
  //     axiosSecure.patch(`/products/${id}`, featured).then((res) => {
  //       //   console.log(id, res.data);
  //       if (res.data._id) {
  //         toast.success("featured added successfully");
  //         refetch();
  //       }
  //     });
  //   };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Make Moderator</StyledTableCell>
            <StyledTableCell align="center">Make Admin</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUser.map((user, idx) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell align="center">{idx + 1}</StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="left">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.role}</StyledTableCell>
              {/* <StyledTableCell align="center">
                <Button
                  disabled={user.featured === true}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductFeatured(user?._id)}
                >
                  Featured
                </Button>
              </StyledTableCell> */}
              <StyledTableCell align="center">
                <Button
                  disabled={user.role === "Moderator"}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductAccept(user?._id)}
                >
                  Make Moderator
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={user.role === "Admin"}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductReject(user?._id)}
                >
                  Make Admin
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUser;
