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
import { useQuery } from "@tanstack/react-query";

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

const ReportedProduct = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: reportProduct = [],
    refetch,
  } = useQuery({
    queryKey: ["reportProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/secure?report=true`);

      return res?.data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
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
            <StyledTableCell align="center">View Details</StyledTableCell>
            <StyledTableCell align="center">Delate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportProduct?.map((product, idx) => (
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

export default ReportedProduct;
