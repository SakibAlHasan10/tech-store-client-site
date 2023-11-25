import { Container, Grid, TextField, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import useAuth from "../../../../hooks/authHook/useAuth";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProduct = () => {
  const { user } = useAuth();
  //   const name = user?.displayName

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const productName = data.get("productName");
    const productImage = data.get("productImage");
    const productDescription = data.get("productDescription");
    const name = user?.displayName;
    const email = user?.email;
    const photo = user.photoURL;
    const product = {
      productName,
      productImage,
      productDescription,
      name,
      email,
      photo,
    };
    console.log(product);
  };
  return (
    <Box>
      <Typography textAlign={"center"} sx={{ fontWeight: "800" }}>
        Add Product
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 8 }}>
        <Container sx={{ display: "flex", gap: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="productName"
                label="Product Name"
                name="productName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Product Description"
                name="productDescription"
                multiline
                required
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                fullWidth
                startIcon={<CloudUploadIcon />}
              >
                Upload Product Image
                <VisuallyHiddenInput type="file" />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled
                fullWidth
                id="outlined-disabled"
                label="Owner Name"
                name="name"
                defaultValue={user?.displayName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Owner Email"
                fullWidth
                name="email"
                defaultValue={user?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Owner Photo"
                name="photo"
                fullWidth
                defaultValue={user?.photoURL}
              />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Button
            type="submit"
            size="medium"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AddProduct;
