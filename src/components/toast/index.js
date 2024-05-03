import React from "react";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Snackbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledSnackbar = styled(Snackbar)({
  width: 500,
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#E0F8D1",
  },
});

const StyledTypography = styled(Typography)({
  color: "rgb(15, 92, 46)",
  fontWeight: 500,
  fontSize: 16,
});

const ToastSuccess = ({ openToast, handleCloseToast, text, showClose }) => {
  return (
    <StyledSnackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={openToast}
      onClose={handleCloseToast}
      message={
        <Box display="flex" alignItems="center" justifyContent="center">
          <CheckCircle color="success" onClick={handleCloseToast} />
          <StyledTypography variant="h6" sx={{ ml: 2, whiteSpace: "pre-line" }}>
            {text}
          </StyledTypography>
          {showClose && (
            <CloseIcon
              sx={{
                color: "#4F9E52",
                position: "absolute",
                right: 20,
                cursor: "pointer",
              }}
              onClick={handleCloseToast}
            />
          )}
        </Box>
      }
    />
  );
};

export default ToastSuccess;
