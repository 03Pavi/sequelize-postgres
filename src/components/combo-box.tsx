import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ComboProps {
  options: any[];
  label: string;
}
export default function ComboBox({ options, label }: ComboProps) {
  return (
    <Autocomplete
      sx={{ width: "300px", height: "auto" }}
      getOptionLabel={(option) => option.label}
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
