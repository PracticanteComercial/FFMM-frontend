import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FundsFilter from './FundsFilter';
import Searcher from './Searcher';
import { Col, Row, Button, Modal } from 'antd';
import './CSS/MutualFundsPage.css';
import ListMyFunds from './ListMyFunds';
import axios from 'axios';
import FundsList from './FundsList';

const backend_URL = import.meta.env.VITE_BACKEND_URL;

const MutualFundsPage = () => {
    const [ffmms, setFfmm] = useState([]);
    const [saldoDisponible, setSaldoDisponible] = useState(0);
    const [clientNumber, setClientNumber] = useState("15366350/0");
    const [loggedIn, setLoggedIn] = useState(true);
    const [clientName, setClientName] = useState("");
    const [myFunds, setMyFunds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`${backend_URL}/getBalance/${clientNumber}`);
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response.data;
            setSaldoDisponible(data.montoCLP);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const fetchClientName = async () => {
        try {
            const response = await axios.get(`${backend_URL}/getClientName/${clientNumber}`);
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response.data;
            setClientName(data);
        } catch (error) {
            console.error('Error fetching client name:', error);
        }
    };

    const fetchFfmmData = async () => {
        try {
            const response = await axios.get(`${backend_URL}/FFMMs`);
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response.data;
            console.log(data.FFMMs);
            setFfmm(data.FFMMs);
        } catch (error) {
            console.error('Error fetching FFMM data:', error);
        }
    };

    const fetchMyFunds = async () => {
        try {
            const response = await axios.get(`${backend_URL}/getClientFunds/${clientNumber}`);
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response.data;
            setMyFunds(data);
        } catch (error) {
            console.error('Error fetching client funds:', error);
        }
    };

    useEffect(() => {
        fetchFfmmData();
        fetchBalance();
        fetchClientName();
        fetchMyFunds();
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

    const handleFiltroChange = (tipoFiltro, nuevoFiltro) => {
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            [tipoFiltro]: nuevoFiltro,
        }));
    };

    const handleBusquedaChange = (nuevaBusqueda) => {
        setBusqueda(nuevaBusqueda);
    };

    const fondosFiltrados = ffmms.filter((fondo) => {
        for (const tipoFiltro in filtros) {
            if (filtros[tipoFiltro].length > 0) {
                if (filtros[tipoFiltro] && !filtros[tipoFiltro].includes(fondo[tipoFiltro])) {
                    return false;
                }
            }
        }
        return fondo.name.toLowerCase().includes(busqueda.toLowerCase());
    });

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Row className="row-filtros" style={{ marginTop: "2%", marginBottom: "5%" }}>
                <Col xs={24} xl={6} style={{ paddingLeft: "4%" }}>
                    <FundsFilter opcionesFiltro={opcionesFiltro} onFiltroChange={handleFiltroChange} />
                    {loggedIn ? (
                        <>
                            <Button className='rescue-button' type="primary" block ghost size='large' onClick={showModal}>
                                Rescate de fondos mutuos
                            </Button>
                            <Modal
                                footer={[
                                    <Button key="back" type="primary" onClick={handleOk}>
                                        Salir
                                    </Button>,
                                ]}
                                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                width={1200} >
                                <h2 className='rescue-funds'>Mis Fondos Mutuos</h2>
                                <ListMyFunds fondos={myFunds} />
                                <h6 className='alert-message'>*El monto a rescatar es referencial. El valor cuota del rescate será del día de ejecución del rescate en Vector Capital.</h6>
                            </Modal>
                        </>
                    ) : (
                        <Button href="https://portalclientes.vectorcapital.cl/sign-in" className='rescue-button' type="primary" block ghost size='large'>
                            Iniciar sesión para rescatar fondos
                        </Button>
                    )}
                </Col>
                <Col xs={24} xl={18} style={{ paddingLeft: "2%", paddingRight: "4%" }}>
                    <Row className='row-searcher'>
                        <Col>
                            <Searcher onBusquedaChange={handleBusquedaChange} />
                        </Col>
                    </Row>
                    <Row >
                        <FundsList fondos={fondosFiltrados} balance={saldoDisponible} clientNumber={clientNumber} clientName={clientName} loggedIn={loggedIn} />
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default MutualFundsPage;
