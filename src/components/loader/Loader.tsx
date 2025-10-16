import { Backdrop, CircularProgress } from "@mui/material";
import { Box, Stack } from "@mui/system";



export function Loader() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress
          sx={{
            "svg circle": { stroke: "url(#my_gradient)" },
            position: "absolute",
            top: "45%",
          }}
          size={100}
        />
      </Backdrop>
    </Box>
  );
}