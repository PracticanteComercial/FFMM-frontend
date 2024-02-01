import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Col, Row, Select, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import filterImage from './assets/filter.jpg';
import './CSS/FundsFilter.css';

const FundsFilter = ({ opcionesFiltro, onFiltroChange }) => {

    const handleFilterChange = (tipoFiltro, newValue) => {
        onFiltroChange(tipoFiltro, newValue);
    };

    return (
        <div className="card  border-primary mb-3" >
            <div className="card-header text-primary">
                <img src={filterImage} alt="Imagen de filtro" className="filtro-imagen" />
                <strong className="filtro-texto">Filtros</strong>
            </div>
            <div className="card-body">
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
                    <Row>
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%',
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Todos los tipos de fondo"
                                    onChange={(newValue) => handleFilterChange('type', newValue)}
                                >
                                    {opcionesFiltro.type.map((opcion) => (
                                        <Select.Option key={opcion} value={opcion}>
                                            {opcion}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Moneda del fondo</p>
                        </Col>
                        <Col>
                            <Tooltip title="En qué moneda está expresada las cuotas del fondo.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%',
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Todo tipo de moneda"
                                    onChange={(newValue) => handleFilterChange('money', newValue)}
                                >
                                    {opcionesFiltro.money.map((opcion) => (
                                        <Select.Option key={opcion} value={opcion}>
                                            {opcion}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Nivel de riesgo</p>
                        </Col>
                        <Col>
                            <Tooltip title="Riesgo del fondo en base a los instrumentos que invierte. Rojo: mayor riesgo. Amarillo: riesgo moderado. Verde: menor riesgo.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%',
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Todos los niveles"
                                    onChange={(newValue) => handleFilterChange('riskLevel', newValue)}
                                >
                                    {opcionesFiltro.riskLevel.map((opcion) => (
                                        <Select.Option key={opcion} value={opcion}>
                                            {opcion}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <p>Período de rescate</p>
                        </Col>
                        <Col>
                            <Tooltip title="Tiempo en días para el pago del rescate una vez solicitado.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%',
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Todas las rescatabilidades"
                                    onChange={(newValue) => handleFilterChange('rescueability', newValue)}
                                >
                                    {opcionesFiltro.rescueability.map((opcion) => (
                                        <Select.Option key={opcion} value={opcion}>
                                            {opcion}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <p>Administradora General de Fondos</p>
                        </Col>
                        <Col>
                            <Tooltip title="AGF-Entidad que administra el fondo.">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                    marginBottom: '4%',
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Todas las administradoras"
                                    onChange={(newValue) => handleFilterChange('agf', newValue)}
                                >
                                    {opcionesFiltro.agf.map((opcion) => (
                                        <Select.Option key={opcion} value={opcion}>
                                            {opcion}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    );
};

export default FundsFilter;
