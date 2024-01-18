import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FundsFilter from './FundsFilter';
import Searcher from './Searcher';
import ListFunds from './ListFunds';
import { Col, Row } from 'antd';
import './CSS/MutualFundsPage.css';
import Navbar from './NavBar';


const MutualFundsPage = () => {
    const [ffmms, setFfmm] = useState([]);

    const fetchFfmmData = async () => {
        try {
            const response = await fetch('http://localhost:3001/FFMMs');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data.FFMMs);
            setFfmm(data.FFMMs);
        } catch (error) {
            console.error('Error fetching FFMM data:', error);
        }
    };
    useEffect(() => {
        fetchFfmmData();
    }, []);

    const [filtros, setFiltros] = useState({
        type: [],
        agf: [],
        money: [],
        rescueability: [],
        riskLevel: [],
    });

    const opcionesFiltro = {
        type: ffmms.map(fondo => fondo.type).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index),
        agf: ffmms.map(fondo => fondo.agf).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index),
        money: ffmms.map(fondo => fondo.money).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index),
        rescueability: ffmms.map(fondo => fondo.rescueability).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index),
        riskLevel: ffmms.map(fondo => fondo.riskLevel).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index)
    };

    const [busqueda, setBusqueda] = useState('');

    // Función para manejar cambios en los filtros
    const handleFiltroChange = (tipoFiltro, nuevoFiltro) => {
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            [tipoFiltro]: nuevoFiltro,
        }));
    };

    // Función para manejar cambios en la búsqueda
    const handleBusquedaChange = (nuevaBusqueda) => {
        setBusqueda(nuevaBusqueda);
    };

    // Filtrar fondos según los filtros seleccionados
    const fondosFiltrados = ffmms.filter((fondo) => {
        for (const tipoFiltro in filtros) {
            if (filtros[tipoFiltro].length > 0) {
                if (filtros[tipoFiltro] && !filtros[tipoFiltro].includes(fondo[tipoFiltro])) {
                    return false;
                }
            }
        }
        // Aplicar filtro de búsqueda
        return fondo.name.toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
        <>
            <Row className='first-row'>
                <Navbar />
            </Row>
            <Row className="row-filtros" style={{ marginTop: "2%", marginBottom: "5%" }}>
                <Col xs={24} xl={6} style={{ paddingLeft: "4%" }}>
                    <FundsFilter opcionesFiltro={opcionesFiltro} onFiltroChange={handleFiltroChange} />
                </Col>
                <Col xs={24} xl={18} style={{ paddingLeft: "2%", paddingRight: "4%" }}>
                    <Row className='row-searcher'>
                        <Col>
                            <Searcher onBusquedaChange={handleBusquedaChange} />
                        </Col>
                    </Row>
                    <Row className='row-lista-fondos'>
                        <ListFunds fondos={fondosFiltrados} />
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default MutualFundsPage;
