import useAllProduct from "../../../../hooks/fetchaAlProduct/useAllProduct";
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
import useAxiosSecure from "../../../../hooks/axiosSecure/useAxiosSecure";
import toast from "react-hot-toast";

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
  const [allProduct, , refetch] = useAllProduct();
  const axiosSecure = useAxiosSecure();

  const pendingProduct = allProduct.filter(
    (prod) => prod?.status === "Pending"
  );
  const othersProduct = allProduct.filter((prod) => prod?.status !== "Pending");

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
  const handleProductFeatured = (id) => {
    const featured = { featured: true };
    axiosSecure.patch(`/products/${id}`, featured).then((res) => {
      //   console.log(id, res.data);
      if (res.data._id) {
        toast.success("featured added successfully");
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
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="center">View Details</StyledTableCell>
            <StyledTableCell align="center">Make Featured</StyledTableCell>
            <StyledTableCell align="center">Accept</StyledTableCell>
            <StyledTableCell align="center">Reject</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingProduct.map((product, idx) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="center">{idx + 1}</StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {product.productName}
              </StyledTableCell>
              <StyledTableCell align="left">{product.status}</StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`/details/${product?._id}`}>
                  <Button size="small">Details</Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={product.featured === true}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductFeatured(product?._id)}
                >
                  Featured
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={product.status === "Accepted"}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductAccept(product?._id)}
                >
                  Accept
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={product.status === "Rejected"}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductReject(product?._id)}
                >
                  Reject
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {othersProduct.map((product, idx) => (
            <StyledTableRow key={product._id}>
              <StyledTableCell align="center">
                {pendingProduct.length + idx + 1}
              </StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                {product.productName}
              </StyledTableCell>
              <StyledTableCell align="left">{product.status}</StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`/details/${product?._id}`}>
                  <Button size="small">Details</Button>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={product.featured === true}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductFeatured(product?._id)}
                >
                  Featured
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={product.status === "Accept"}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductAccept(product?._id)}
                >
                  Accept
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  disabled={product.status === "Reject"}
                  size="small"
                  variant="contained"
                  onClick={() => handleProductReject(product?._id)}
                >
                  Reject
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewProduct;
