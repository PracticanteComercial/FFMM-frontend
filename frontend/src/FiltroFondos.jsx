import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Col, Row, FloatButton, Select, Space } from 'antd';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import filterImage from './assets/filter.jpg';
import './CSS/FiltroFondos.css';

const options = [

    { label: 'AMERIS CAPITAL', value: 'AMERIS CAPITAL' },
    { label: 'BTG PACTUAL', value: 'BTG PACTUAL' },
    { label: 'COMPASS GROUP CHILE S.A.', value: 'COMPASS' },
    { label: 'MBI', value: 'MBI' },
    { label: 'PRINCIPAL', value: 'PRINCIPAL' },
];

const FiltroFondos = ({ onFiltroChange }) => {
    const [value, setValue] = useState([]);
    // const [value, setValue] = useState(['AMERIS CAPITAL', 'BTG PACTUAL', 'COMPASS', 'MBI', 'PRINCIPAL']);
    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value,
        options,
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'AGF',
        maxTagCount: 'responsive',
    };

    const opcionesFiltro = {
        categoria: ['Renta Variable', 'Renta Fija', 'Mixto'],
        administradora: ['Admin 1', 'Admin 2', 'Admin 3'], // Agrega las opciones de administradoras
        tipoMoneda: ['USD', 'EUR', 'JPY'], // Agrega las opciones de tipo de moneda
        rescatabilidad: ['Liquidez Diaria', 'Plazo Fijo'], // Agrega las opciones de rescatabilidad
        riesgo: ['Bajo', 'Moderado', 'Alto'], // Agrega las opciones de nivel de riesgo
    };

    const handleFiltroChange = (tipoFiltro, newValue) => {
        onFiltroChange(tipoFiltro, newValue);
    };

    return (
        <div class="card  border-primary mb-3" >
            <div class="card-header text-primary">
                <img src={filterImage} alt="Imagen de filtro" className="filtro-imagen" />
                <strong className="filtro-texto">Filtros</strong>
            </div>
            <div class="card-body">

                <div>
                    <Row>
                        <Col>
                            <p>Tipo de fondo</p>
                        </Col>
                        <Col>
                            <Tooltip title="Categorías que agrupan a los fondos mutuos según tus objetivos de inversión, estrategias y activos subyacentes.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%'
                                }}
                            >
                                <Select {...selectProps} />
                            </Space>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <p>Moneda</p>
                        </Col>
                        <Col>
                            <Tooltip title="Moneda específica utilizada en transacciones.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%'
                                }}
                            >
                                <Select {...selectProps} />
                            </Space>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <p>Nivel de riesgo</p>
                        </Col>
                        <Col>
                            <Tooltip title="Medida de la probabilidad de pérdida o variabilidad en el rendimiento de una inversión.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%'
                                }}
                            >
                                <Select {...selectProps} />
                            </Space>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <p>Rescatabilidad</p>
                        </Col>
                        <Col>
                            <Tooltip title="Capacidad de recuperar o redimir una inversión antes de su vencimiento o término. ">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%'
                                }}
                            >
                                <Select {...selectProps} />
                            </Space>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <p>Administradora General de Fondos</p>
                        </Col>
                        <Col>
                            <Tooltip title="Entidad que administra fondos de inversión y fondos mutuos.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Select {...selectProps} />
                            </Space>
                        </Col>
                    </Row>


                    <Row className='reset-filter'>
                        {/* <Button type="primary" danger ghost block>
                            Reiniciar filtros
                        </Button> */}
                        <Button type="primary" ghost block>Reiniciar filtros</Button>
                    </Row>
                    {/* 
                    <Row>
                        <div>
                            <p>Filtrar por Categoría</p>
                            <select onChange={(e) => onFiltroChange('categoria', e.target.value)}>
                                <option value="">Todos</option>
                                {opcionesFiltro.categoria.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>

                            <p>Filtrar por Administradora</p>
                            <select onChange={(e) => onFiltroChange('administradora', e.target.value)}>
                                <option value="">Todos</option>
                                {opcionesFiltro.administradora.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                            <p>Filtrar por Tipo de Moneda</p>
                            <select onChange={(e) => onFiltroChange('tipoMoneda', e.target.value)}>
                                <option value="">Todos</option>
                                {opcionesFiltro.tipoMoneda.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>

                            <p>Filtrar por Rescatabilidad</p>
                            <select onChange={(e) => onFiltroChange('rescatabilidad', e.target.value)}>
                                <option value="">Todos</option>
                                {opcionesFiltro.rescatabilidad.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>

                            <p>Filtrar por Nivel de Riesgo</p>
                            <select onChange={(e) => onFiltroChange('riesgo', e.target.value)}>
                                <option value="">Todos</option>
                                {opcionesFiltro.riesgo.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Row> */}
                </div>
            </div>
        </div >
    );
};

export default FiltroFondos;
