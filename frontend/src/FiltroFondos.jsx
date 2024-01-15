import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip, Col, Row, FloatButton, Select, Space } from 'antd';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import filterImage from './assets/filter.jpg';
import './CSS/FiltroFondos.css';



const FiltroFondos = ({ opcionesFiltro, onFiltroChange }) => {
    const [value, setValue] = useState([]);
    // const [value, setValue] = useState(['AMERIS CAPITAL', 'BTG PACTUAL', 'COMPASS', 'MBI', 'PRINCIPAL']);
    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        value,
        options: opcionesFiltro.agf.map((opcion) => ({
            label: opcion,
            value: opcion,
        })),
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'AGF',
        maxTagCount: 'responsive',
    };

    const handleFiltroChange = (tipoFiltro, newValue) => {
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
                                    style={{ width: '100%' }}
                                    placeholder="Tipo de Fondo"
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
                                    style={{ width: '100%' }}
                                    placeholder="Moneda"
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
                                    style={{ width: '100%' }}
                                    placeholder="Nivel de Riesgo"
                                    onChange={(newValue) => handleFiltroChange('rickLevel', newValue)}
                                >
                                    {opcionesFiltro.rickLevel.map((opcion) => (
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
                                    style={{ width: '100%' }}
                                    placeholder="Rescatabilidad"
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
                                    style={{ width: '100%' }}
                                    placeholder="Administradora"
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


                    <Row className='reset-filter'>
                        {/* <Button type="primary" danger ghost block>
                            Reiniciar filtros
                        </Button> */}
                        <Button type="primary" ghost block onClick={() => handleResetFiltros()}>Reiniciar filtros</Button>
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
