import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { makePostRequest } from '../../services/api';
// import { createTreasureMap, makePostRequest } from '../../services/api';

// import styles from './TreasureMapForm.module.css';

function TreasureMapForm({ onMapCreated }) {
    const [rows, setRows] = useState('');
    const [columns, setColumns] = useState('');
    const [maxTreasureValue, setMaxTreasureValue] = useState('');
    const [matrix, setMatrix] = useState([]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null); // Thêm state để quản lý lỗi

    const handleRowsChange = (event) => {
        const newRows = parseInt(event.target.value) || 0;
        setRows(newRows);
        setMatrix(Array(newRows).fill(Array(parseInt(columns) || 0).fill('')));
    };

    const handleColumnsChange = (event) => {
        const newColumns = parseInt(event.target.value) || 0;
        setColumns(newColumns);
        setMatrix(Array(parseInt(rows) || 0).fill(Array(newColumns).fill('')));
    };

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = matrix.map((rowArray, rowIndex) =>
            rowArray.map((cellValue, colIndex) =>
                rowIndex === row && colIndex === col ? value : cellValue
            )
        );
        setMatrix(newMatrix);
    };

    const handleSubmit = async () => {
        try {
            setError(null); // Reset lỗi trước khi gọi API
            const data = {
                rows: parseInt(rows),
                columns: parseInt(columns),
                maxTreasureValue: parseInt(maxTreasureValue),
                matrix: JSON.stringify(matrix.map(row => row.map(Number))) 
            };
            const headers = {
                'Content-Type': 'application/json',
              };
            console.log(data)
            // const response = await createTreasureMap(data);
            const response = await makePostRequest(headers,data);

            
            onMapCreated(response);
            setResult(response);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Failed to create treasure map. Please check your input.'); // Hiển thị lỗi
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Find Treasure</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Rows"
                        type="number"
                        value={rows}
                        onChange={handleRowsChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Columns"
                        type="number"
                        value={columns}
                        onChange={handleColumnsChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Max Treasure Value"
                        type="number"
                        value={maxTreasureValue}
                        onChange={(e) => setMaxTreasureValue(e.target.value)}
                        fullWidth
                    />
                </Grid>
                {matrix.map((row, rowIndex) => (
                    <Grid item xs={12} key={rowIndex}>
                        <Grid container spacing={1}>
                            {row.map((cell, colIndex) => (
                                <Grid item key={colIndex}>
                                    <TextField
                                        type="number"
                                        value={cell}
                                        onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                                        style={{ width: '100px' }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
                {result && (
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Min Fuel: {result.minFuel}
                        </Typography>
                    </Grid>
                )}
                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default TreasureMapForm;