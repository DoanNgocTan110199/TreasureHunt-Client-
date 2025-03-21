import React, { useState } from 'react';
import TreasureMapForm from './components/TreasureMapForm/TreasureMapForm';
import TreasureMapList from './components/TreasureMapList/TreasureMapList';

function App() {
    const [mapCreated, setMapCreated] = useState(false);

    const handleMapCreated = (newMap) => {
        setMapCreated(!mapCreated);
    };

    return (
        <div className="App">
            <TreasureMapForm onMapCreated={handleMapCreated} />
            <TreasureMapList key={mapCreated} />
        </div>
    );
}

export default App;