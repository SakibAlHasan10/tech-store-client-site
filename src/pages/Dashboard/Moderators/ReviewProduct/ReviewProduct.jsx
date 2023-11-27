import useAllProduct from "../../../../hooks/fetchaAlProduct/useAllProduct";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

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

const ReviewProduct = () => {
  const [allProduct] = useAllProduct();
  console.log(allProduct);

  const handleDetails = (id) => {
    console.log(id);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="left">Product Name</StyledTableCell>
            <StyledTableCell align="center">View Details</StyledTableCell>
            <StyledTableCell align="center">Make Featured</StyledTableCell>
            <StyledTableCell align="center">Accept</StyledTableCell>
            <StyledTableCell align="center">Reject</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProduct.map((product, idx) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="center">{idx + 1}</StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {product.productName}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`/details/${product?._id}`}>
                  <Button size="small">Details</Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button size="small">Featured</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button size="small" variant="contained">
                  Accept
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton color="#000" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {allProduct.map((product, idx) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="center">
                {allProduct.length + idx + 1}
              </StyledTableCell>
              <StyledTableCell align="left">
                {product.productName}
              </StyledTableCell>
              <StyledTableCell align="center">button</StyledTableCell>
              <StyledTableCell align="center">button</StyledTableCell>
              <StyledTableCell align="center">button</StyledTableCell>
              <StyledTableCell align="center">button</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewProduct;
