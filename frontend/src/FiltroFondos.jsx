// FiltroFondos.js
import React, { useState } from 'react';
import { Select, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import Container from 'react-bootstrap/Container';
import { Col, Row, FloatButton } from 'antd';

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

    return (

        <div>
            <Row >
                <Col span={20}>
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Select {...selectProps} />
                    </Space>
                </Col>
                <Col span={4}>
                    <Tooltip title="AFG son administradoras generales de fondos">
                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                    </Tooltip>
                </Col>
            </Row>

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
            </Row>
        </div>
    );
};

export default FiltroFondos;
