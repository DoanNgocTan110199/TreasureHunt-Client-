import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Container, Typography, CircularProgress } from '@mui/material';
import { getTreasureMaps } from '../../services/api';
// import styles from './TreasureMapList.module.css';

function TreasureMapList() {
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state để quản lý trạng thái tải
    const [error, setError] = useState(null); // Thêm state để quản lý lỗi

    useEffect(() => {
        fetchMaps();
    }, []);

    const fetchMaps = async () => {
        try {
            setLoading(true); // Bắt đầu tải
            setError(null); // Reset lỗi
            const data = await getTreasureMaps();
            console.log(data)
            setMaps(data.data);
        } catch (error) {
            console.error('Error fetching treasure maps:', error);
            setError('Failed to fetch treasure maps.'); // Hiển thị lỗi
        } finally {
            setLoading(false); // Kết thúc tải
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Treasure Maps</Typography>
            {loading && <CircularProgress />} {/* Hiển thị loading indicator */}
            {error && <Typography color="error">{error}</Typography>} {/* Hiển thị lỗi */}
            {!loading && !error && (
                <List>
                    {maps.map(map => (
                        <ListItem key={map.id}>
                            <ListItemText primary={`Map ${map.id}`} secondary={`Min Fuel: ${map.minFuel}`} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}

export default TreasureMapList;