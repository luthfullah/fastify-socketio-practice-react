import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const SubmittedForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/forms");
        // Add id field if missing
        const dataWithId = res.data.map((item, index) => ({
          ...item,
          id: item.id || index + 1, // DataGrid needs a unique 'id' field
        }));
        setForms(dataWithId);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError(err.response?.data || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 0.8 },
    { field: "country", headerName: "Country", flex: 0.8 },
    { field: "birthDate", headerName: "Birth Date", flex: 0.8 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    { field: "message", headerName: "Message", flex: 1 },
    { field: "newsletter", headerName: "Newsletter", flex: 0.5 },
    { field: "terms", headerName: "Terms", flex: 0.5 },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Paper elevation={3} sx={{ minWidth: 600, height: 600 }}>
        <DataGrid
          rows={forms}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </Box>
  );
};

export default SubmittedForms;
