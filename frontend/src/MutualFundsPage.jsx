import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FundsFilter from './FundsFilter';
import Searcher from './Searcher';
import ListFunds from './ListFunds';
import { Col, Row, Button, Flex, Modal } from 'antd';
import './CSS/MutualFundsPage.css';
import Navbar from './NavBar';
import AntdList from './AntdList';
import ListMyFunds from './ListMyFunds';
import { LogoutOutlined, FileSearchOutlined } from '@ant-design/icons';
import axios from 'axios';


const backend_URL = import.meta.env.VITE_BACKEND_URL;


const MutualFundsPage = () => {
    const [ffmms, setFfmm] = useState([]);
    const [saldoDisponible, setSaldoDisponible] = useState(0);
    const [clientNumber, setClientNumber] = useState("15366350/0");
    const [clientName, setClientName] = useState("");
    const [myFunds, setMyFunds] = useState([]);

    // const fetchBalance = async () => {
    //     try {
    //         const response = await fetch(`${backend_URL}/getBalance/${clientNumber}`);
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.statusText}`);
    //         }
    //         const data = await response.json();
    //         // console.log(data.montoCLP)
    //         setSaldoDisponible(data.montoCLP);
    //     } catch (error) {
    //         console.error('Error fetching balance:', error);
    //     }
    // };

    // const fetchClientName = async () => {
    //     try {
    //         const response = await fetch(`${backend_URL}/getClientName/${clientNumber}`);
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.statusText}`);
    //         }
    //         const data = await response.text();
    //         // console.log(data)
    //         setClientName(data);
    //     } catch (error) {
    //         console.error('Error fetching client name:', error);
    //     }
    // };

    // const fetchFfmmData = async () => {
    //     try {
    //         const response = await fetch(`${backend_URL}/FFMMs`);
    //         console.log(response);
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.statusText}`);
    //         }
    //         const data = await response.json();
    //         console.log(data.FFMMs);

    //         // console.log(data.FFMMs);
    //         setFfmm(data.FFMMs);
    //     } catch (error) {
    //         console.error('Error fetching FFMM data:', error);
    //     }
    // };

    // const fetchMyFunds = async () => {
    //     try {

    //         const response = await fetch(`${backend_URL}/getClientFunds/${clientNumber}`);
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.statusText}`);
    //         }
    //         const data = await response.json();
    //         setMyFunds(data);
    //     } catch (error) {
    //         console.error('Error fetching client funds:', error);
    //     }
    // };


    const fetchBalance = async () => {
        try {
            const response = await axios.get(`${backend_URL}/getBalance/${clientNumber}?ngrok-skip-browser-warning`);
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response.data;
            // console.log(data.montoCLP)
            setSaldoDisponible(data.montoCLP);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const fetchClientName = async () => {
        try {
            const response = await axios.get(`${backend_URL}/getClientName/${clientNumber}?ngrok-skip-browser-warning`);
            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = response.data;
            // console.log(data)
            setClientName(data);
        } catch (error) {
            console.error('Error fetching client name:', error);
        }
    };

    const fetchFfmmData = async () => {
        try {
            const response = await axios.get(`${backend_URL}/FFMMs?ngrok-skip-browser-warning`);
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
            const response = await axios.get(`${backend_URL}/getClientFunds/${clientNumber}?ngrok-skip-browser-warning=true`);
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDownload = () => {
        // const link = document.createElement('a');
        // link.href = './assets/Manual de rescate FFMM.pdf';
        // link.download = 'Manual de rescate FFMM.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        window.open('https://www.ccbolsa.cl/apps/static/informaciones/ManualFFMM.pdf', '_blank');
    };

    return (
        <>
            <Row className='first-row'>
                <Navbar clientName={clientName} clientNumber={clientNumber} />
            </Row>
            <Row className="row-filtros" style={{ marginTop: "2%", marginBottom: "5%" }}>
                <Col xs={24} xl={6} style={{ paddingLeft: "4%" }}>
                    <FundsFilter opcionesFiltro={opcionesFiltro} onFiltroChange={handleFiltroChange} />
                    <Button type="primary" block ghost size='large' onClick={showModal}>
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
                        <h5 className='alert-message'>*El monto a rescatar es referencial. El valor cuota del rescate será del día de ejecución del rescate en Vector Capital.</h5>
                        <ListMyFunds fondos={myFunds} />
                    </Modal>
                </Col>
                <Col xs={24} xl={18} style={{ paddingLeft: "2%", paddingRight: "4%" }}>
                    <Row className='row-searcher'>
                        <Col>
                            <Searcher onBusquedaChange={handleBusquedaChange} />
                        </Col>
                    </Row>
                    <Row className='row-lista-fondos'>
                        <AntdList fondos={fondosFiltrados} balance={saldoDisponible} clientNumber={clientNumber} clientName={clientName} />
                        {/* <ListFunds fondos={fondosFiltrados} /> */}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default MutualFundsPage;
