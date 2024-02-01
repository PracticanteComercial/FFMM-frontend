import React, { useState } from 'react';
import { Input, Button, Popconfirm, message, Table } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const ListMyFunds = ({ fondos }) => {
    const [investmentAmounts, setInvestmentAmounts] = useState(fondos.map(() => 0));

    const handleInvestmentAmountChange = (index, value) => {
        if (value === '') {
            const newInvestmentAmounts = [...investmentAmounts];
            newInvestmentAmounts[index] = 0;
            setInvestmentAmounts(newInvestmentAmounts);
            return;
        }

        const newValue = parseFloat(value);

        if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
            const newInvestmentAmounts = [...investmentAmounts];
            newInvestmentAmounts[index] = newValue;
            setInvestmentAmounts(newInvestmentAmounts);
        }
    };

    const handleRescue = async (fondo, porcentaje) => {
        if (porcentaje === 0) {
            message.error('El porcentaje a rescatar no puede ser cero.');
            return;
        }

        const data = {
            idInstrumento: fondo.idInstrumento,
            dscInstrumento: fondo.dscInstrumento,
            nemotecnico: fondo.nemotecnico,
            cantidad: fondo.cantidad,
            tasaPrecio: fondo.tasaPrecio,
            porcentajeDeCantidadCuota: porcentaje,
            cuenta: fondo.cuenta,
            identificador: fondo.identificador,
            nombreCliente: fondo.nombre,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendRescueFundEmailToExecutive`, data);

            message.success('La solicitud de rescate fue enviada correctamente.');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            message.error('Hubo un problema al enviar la solicitud de rescate. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const datacolumns = [
        {
            title: 'Fondo a rescatar',
            dataIndex: 'dscInstrumento',
            key: 'dscInstrumento',
        },
        {
            title: 'Mis cuotas',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Valor cuota',
            dataIndex: 'tasaPrecio',
            key: 'tasaPrecio',
        },
        {
            title: 'Monto',
            render: (_, record) => Math.floor(record.tasaPrecio * record.cantidad),
        },
        {
            title: '% de cuotas a rescatar',
            render: (_, record, index) => (
                <Input
                    className='money-input'
                    size='large'
                    suffix="%"
                    value={investmentAmounts[index]}
                    onChange={(e) => handleInvestmentAmountChange(index, e.target.value)}
                />
            ),
        },
        {
            title: 'Monto referencial de rescate',
            render: (_, record, index) => (
                <strong>
                    {isNaN(record.tasaPrecio * record.cantidad * investmentAmounts[index] / 100) || investmentAmounts[index] === 0 ?
                        0 :
                        Math.trunc(record.tasaPrecio * record.cantidad * investmentAmounts[index] / 100)}
                </strong>
            ),
        },
        {
            title: 'Confirmar',
            render: (_, record, index) => (
                <Popconfirm
                    title="¿Estás seguro de rescatar este fondo?"
                    onConfirm={() => handleRescue(record, investmentAmounts[index])}
                    okText="Sí"
                    cancelText="No"
                >
                    <Button type="primary" shape="circle" size="large" icon={<LogoutOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={datacolumns}
                dataSource={fondos}
                rowKey="idInstrumento"
                size='small'
                scroll={{ x: 768 }}
            />
        </div>
    )
};

export default ListMyFunds;


