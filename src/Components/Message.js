import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { AlertTitle } from "@mui/material";

export default function TransitionAlerts(props) {
  let { showMessage, message,severity } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={showMessage}>
        <Alert sx={{ mb: 2 }} severity={severity ? severity : "success"}>
          <AlertTitle>{message}</AlertTitle>
          </Alert>
      </Collapse>
    </Box>
  );
}
