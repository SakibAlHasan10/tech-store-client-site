import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
// import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
// import toast from "react-hot-toast";
// import useGetAllUser from "../../../../hooks/getAllUser/useGetAllUser";

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

const ManageCoupon = () => {
//   const axiosSecure = useAxiosSecure();
//   const [allUser, , refetch] = useGetAllUser();
  //   console.log(allUser);

  //   product status accept
//   const handleUserMakeModerator = (id) => {
//     const role = { role: "Moderator" };
//     axiosSecure.patch(`/user/role/${id}`, role).then((res) => {
//       //   console.log(id, res.data);

//       if (res.data._id) {
//         toast.success("Product accepted successfully");
//         refetch();
//       }
//     });
//   };
  //   product status reject
//   const handleUserMakeAdmin = (id) => {
//     const role = { role: "Admin" };
//     axiosSecure.patch(`/user/role/${id}`, role).then((res) => {
//       //   console.log(id, res.data);

//       if (res.data._id) {
//         toast.success("Product rejected successfully");
//         refetch();
//       }
//     });
//   };
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
    <div >
      <div className="flex justify-between px-5 items-center my-3">
        <div className="text-2xl">Total Coupon:</div>
        <div>
            <Button sx={{fontSize:"18px"}}>
                create new coupon
            </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="left">Coupon Code</StyledTableCell>
              <StyledTableCell align="left">Discount</StyledTableCell>
              <StyledTableCell align="center">Expire Date</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {allUser.map((user, idx) => ( */}
              <StyledTableRow 
            //   key={user._id}
              >
                <StyledTableCell align="center">
                    {/* {idx + 1} */}
                    </StyledTableCell>
                <StyledTableCell align="left" component="th" scope="row">
                  {/* {user.name} */}
                </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">
                  
                </StyledTableCell>
                <StyledTableCell align="center">
                  
                </StyledTableCell>
              </StyledTableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageCoupon;
