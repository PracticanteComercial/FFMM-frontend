import React from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Buscador = ({ onBusquedaChange }) => {
    return (
        <div>
            <Space direction="horizontal">
                <Search
                    placeholder="Buscador de Fondos"
                    allowClear
                    onSearch={onSearch}
                    size="medium"
                    style={{
                        width: 900,
                        marginLeft: '2%',
                        marginRight: '2%',
                        maxWidth: '96%',
                    }}
                    onChange={(e) => onBusquedaChange(e.target.value)}
                />

               
            </Space>
        </div >
    );
};

export default Buscador;
