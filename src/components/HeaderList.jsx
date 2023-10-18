import { Stack, TextField, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function HeaderList() {
  return (
    <Stack mt={1}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        label="Search"
      />
    </Stack>
  );
}

export default HeaderList;
