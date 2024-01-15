import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FiltroFondos from './FiltroFondos';
import Buscador from './Buscador';
import ListaFondos from './ListaFondos';
import { Col, Row } from 'antd';
import NavBarImage from './assets/NavBar.png';
import './CSS/FondosMutuosPage.css';
import { Pagination } from 'antd';


const FondosMutuosPage = () => {
    const [ffmms, setFfmm] = useState([]);
    const fetchFfmmData = async () => {
        try {
            const response = await fetch('http://localhost:3001/FFMMs');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setFfmm(data.FFMMs);
            console.log("FFMM of bdd");
            console.log(data.FFMMs);
        } catch (error) {
            console.error('Error fetching FFMM data:', error);
        }
    };
    useEffect(() => {
        fetchFfmmData();
    }, []);


    // Estado para los filtros seleccionados
    const [filtros, setFiltros] = useState({
        categoria: null,
        administradora: null,
        tipoMoneda: null,
        rescatabilidad: null,
        riesgo: null,
    });

    // Estado para la búsqueda
    const [busqueda, setBusqueda] = useState('');

    // Estado para la lista de fondos mutuos (simulado, deberías obtenerlo de tu backend)
    const [fondosMutuos, setFondosMutuos] = useState([
        {
            id: 1,
            nombre: 'AMERIS LIQUIDEZ FM',
            categoria: 'Renta Variable',
            administradora: 'Admin 1',
            tipoMoneda: 'USD',
            rescatabilidad: 'Liquidez Diaria',
            riesgo: 'Bajo',
            serie: 'A',
            YTD: '10.5%',
            mensual: '2.3%',
            anual: '8.1%',
            linkReglamentoInterno: 'https://ejemplo.com/reglamento_interno_A.pdf',
            linkFicha: 'https://ejemplo.com/ficha_A.pdf',
            linkInvertir: 'https://ejemplo.com/invertir_A',
        },
        {
            id: 2,
            nombre: 'BTG HIGH YIELD',
            categoria: 'Renta Fija',
            administradora: 'Admin 2',
            tipoMoneda: 'EUR',
            rescatabilidad: 'Plazo Fijo',
            riesgo: 'Moderado',
            serie: 'B',
            YTD: '8.2%',
            mensual: '-1.8%',
            anual: '-6.5%',
            linkReglamentoInterno: 'https://ejemplo.com/reglamento_interno_B.pdf',
            linkFicha: 'https://ejemplo.com/ficha_B.pdf',
            linkInvertir: 'https://ejemplo.com/invertir_B',
        },
        {
            id: 3,
            nombre: 'GESTIÃ“N CONSERVADORA 2024',
            categoria: 'Renta Variable',
            administradora: 'Admin 3',
            tipoMoneda: 'CLP',
            rescatabilidad: 'Plazo Fijo',
            riesgo: 'Alto',
            serie: 'X',
            YTD: '8.2%',
            mensual: '-1.8%',
            anual: '-6.5%',
            linkReglamentoInterno: 'https://ejemplo.com/reglamento_interno_B.pdf',
            linkFicha: 'https://ejemplo.com/ficha_B.pdf',
            linkInvertir: 'https://ejemplo.com/invertir_B',
        },
    ]);


    console.log("fondosMutuos");
    console.log(fondosMutuos);


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
            if (filtros[tipoFiltro] && fondo[tipoFiltro] !== filtros[tipoFiltro]) {
                return false;
            }
        }

        // Aplicar filtro de búsqueda
        return fondo.name.toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
        <>
            <Row className='first-row'>
                <img src={NavBarImage} alt="Bajo Riesgo" className="imagen-fija" />
            </Row>
            <Row className="row-filtros" style={{ marginTop: "10%" }}>
                <Col span={8} style={{ paddingLeft: "4%" }}>
                    <FiltroFondos onFiltroChange={handleFiltroChange} />
                </Col>
                <Col span={16} style={{ paddingLeft: "2%", paddingRight: "4%" }}>
                    <Row className='row-searcher'>
                        <Col>
                            <Buscador onBusquedaChange={handleBusquedaChange} />
                        </Col>
                        <Col>
                            <Pagination simple defaultCurrent={1} total={500} defaultPageSize={20} />
                        </Col>
                    </Row>
                    <Row className='row-lista-fondos'>
                        <ListaFondos fondos={fondosFiltrados} />
                    </Row>
                </Col>
            </Row>

            {/* <Row  className="first-row">
                <img src={NavBarImage} alt="Bajo Riesgo" className="imagen-fija" />
            </Row>
            <Row>
                <Col span={8} style={{ paddingLeft: "4%" }}> <FiltroFondos onFiltroChange={handleFiltroChange} /></Col>
                <Col span={16} style={{ paddingLeft: "3%" }}>
                    <Row className='row-searcher'> <Buscador onBusquedaChange={handleBusquedaChange} /></Row>
                    <Row > <ListaFondos fondos={fondosFiltrados} /></Row>
                </Col>
            </Row> */}
        </>

    );
};

export default FondosMutuosPage;
