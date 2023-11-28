import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
// import useAllProduct from "../../../../hooks/fetchaAlProduct/useAllProduct";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/authHook/useAuth";
import useGetUserAllProduct from "../../../../hooks/useGetUserAllProduct";

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
const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  console.log(email);
  // const [allProduct, , refetch] = useAllProduct();
  const [myProducts, , refetch] = useGetUserAllProduct();
  console.log(myProducts);
  // product deleted
  const handleDeleteProduct = async (id) => {
    axiosSecure.delete(`/products/${id}`).then((res) => {
      if (res.data._id) {
        toast.success("Product delete successfully");
        refetch();
      }
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="left">Product Name</StyledTableCell>
            <StyledTableCell align="left">Votes</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myProducts.map((product, idx) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="center">{idx + 1}</StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {product.productName}
              </StyledTableCell>
              <StyledTableCell align="left">{product.vote}</StyledTableCell>
              <StyledTableCell align="center">{product.status}</StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`/dashboard/update/${product?._id}`}>
                  <Button size="small">Update</Button>
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyProducts;
