import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FiltroFondos from './FiltroFondos';
import Buscador from './Buscador';
import ListaFondos from './ListaFondos';
import { Col, Row } from 'antd';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import NavBarImage from './assets/NavBar.png';
import './CSS/FondosMutuosPage.css';
import { Pagination } from 'antd';


const FondosMutuosPage = () => {
    const [ffmms, setFfmm] = useState([]);
    const [quantityOfFFMM, setQuantityOfFFMM] = useState(0);
    const [quantityPerPageOfFFMM, setQuantityPerPageOfFFMM] = useState(20);

    const fetchFfmmData = async () => {
        try {
            const response = await fetch('http://localhost:3001/FFMMs');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data.FFMMs);
            setFfmm(data.FFMMs);
            setQuantityOfFFMM(data.FFMMs.length);
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

    // Estado para la búsqueda
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
        // console.log("fondo: ", fondo);
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
    
    // const [fondosFiltradosParaPaginacion, setFondosFiltradosParaPaginacion] = useState([]);

    // const onChangeCurrentPage = (page) => {
    //     setFondosFiltradosParaPaginacion(fondosFiltrados.slice((page - 1) * quantityPerPageOfFFMM, (page - 1) * quantityPerPageOfFFMM + quantityPerPageOfFFMM));
    //     console.log(fondosFiltradosParaPaginacion);
    // }

    return (
        <>
            <Row className='first-row'>
                <img src={NavBarImage} alt="Bajo Riesgo" className="imagen-fija" />
            </Row>
            <Row className="row-filtros" style={{ marginTop: "10%", marginBottom: "5%" }}>
                <Col xs={24} xl={6}   style={{ paddingLeft: "4%" }}>
                    <FiltroFondos opcionesFiltro={opcionesFiltro} onFiltroChange={handleFiltroChange} />
                </Col>
                <Col xs={24} xl={18} style={{ paddingLeft: "2%", paddingRight: "4%" }}>
                    <Row className='row-searcher'>
                        <Col>
                            <Buscador onBusquedaChange={handleBusquedaChange} />
                        </Col>
                        {/* <Col>
                            <Pagination simple onChange={onChangeCurrentPage} defaultCurrent={1} total={quantityOfFFMM} defaultPageSize={quantityPerPageOfFFMM} />
                        </Col> */}
                    </Row>
                    <Row className='row-lista-fondos'>
                        <ListaFondos fondos={fondosFiltrados} />
                    </Row>
                </Col>
            </Row>


        </>
    );
};

export default FondosMutuosPage;
