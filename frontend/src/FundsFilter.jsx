import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Col, Row, Select, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import filterImage from './assets/filter.jpg';
import './CSS/FundsFilter.css';


const FundsFilter = ({ opcionesFiltro, onFiltroChange }) => {

    const handleFiltroChange = (tipoFiltro, newValue) => {
        onFiltroChange(tipoFiltro, newValue);
    };

    const handleResetFiltros = () => {
        onFiltroChange('type', []);
        onFiltroChange('agf', []);
        onFiltroChange('money', []);
        onFiltroChange('rescueability', []);
        onFiltroChange('riskLevel', []);
    }

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
                                    onChange={(newValue) => handleFiltroChange('type', newValue)}
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
                            <p>Moneda</p>
                        </Col>
                        <Col>
                            <Tooltip title="Moneda específica utilizada en transacciones.">
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
                                    onChange={(newValue) => handleFiltroChange('money', newValue)}
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
                            <Tooltip title="Medida de la probabilidad de pérdida o variabilidad en el rendimiento de una inversión.">
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
                                    onChange={(newValue) => handleFiltroChange('riskLevel', newValue)}
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
                            <p>Rescatabilidad</p>
                        </Col>
                        <Col>
                            <Tooltip title="Capacidad de recuperar o redimir una inversión antes de su vencimiento o término. ">
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
                                    onChange={(newValue) => handleFiltroChange('rescueability', newValue)}
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
                            <Tooltip title="Entidad que administra fondos de inversión y fondos mutuos.">
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
                                    onChange={(newValue) => handleFiltroChange('agf', newValue)}
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

                    {/*                <Row className='reset-filter'>
                        <Button type="primary" ghost block onClick={() => handleResetFiltros()}>Reiniciar filtros</Button>
                    </Row> */}
                </div>
            </div>
        </div >
    );
};

export default FundsFilter;
