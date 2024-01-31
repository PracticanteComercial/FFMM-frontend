import { Input, Typography, Popconfirm, Button, message, Tooltip } from 'antd';
import './CSS/ListFunds.css';
import React, { useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import { QuestionCircleOutlined } from '@ant-design/icons';


const ListMyFunds = ({ fondos }) => {
    // Crear un array de estados para los porcentajes a rescatar de cada fondo
    const [investmentAmounts, setInvestmentAmounts] = useState(fondos.map(() => 0));

    const handleInvestmentAmountChange = (index, value) => {
        // Si el valor ingresado es una cadena vacía, establecer el valor del porcentaje a 0
        if (value === '') {
            const newInvestmentAmounts = [...investmentAmounts];
            newInvestmentAmounts[index] = 0;
            setInvestmentAmounts(newInvestmentAmounts);
            return; // Salir de la función para evitar la actualización con un valor no numérico
        }

        // Convertir el valor a un número
        const newValue = parseFloat(value);

        // Verificar si el valor es un número válido y está dentro del rango de 0 a 100
        if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
            const newInvestmentAmounts = [...investmentAmounts];
            newInvestmentAmounts[index] = newValue;
            setInvestmentAmounts(newInvestmentAmounts);
        }
    };

    const handleRescue = async (fondo, porcentaje) => {
        // Verificar si el porcentaje es igual a cero
        if (porcentaje === 0) {
            // Mostrar una alerta indicando que el porcentaje no puede ser cero
            message.error('El porcentaje a rescatar no puede ser cero.');
            return; // Salir de la función sin enviar la solicitud POST
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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Fondo a rescatar</th>
                        <th>Mis cuotas</th>
                        <th>Valor cuota
                            <Tooltip title="Valor referencial de una cuota">
                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                            </Tooltip>
                        </th>
                        <th>Monto</th>
                        <th>% de cuotas a rescatar</th>
                        <th>Monto referencial de rescate</th>
                        <th>Confirmar</th>
                    </tr>
                </thead>
                <tbody>
                    {fondos.map((fondo, index) => (
                        <tr key={fondo.idInstrumento}>
                            <td>{fondo.dscInstrumento}</td>
                            <td>{fondo.cantidad.toLocaleString('es-CL')}</td>
                            <td>{new Intl.NumberFormat('es-CL', { minimumFractionDigits: 4 }).format(parseFloat(fondo.tasaPrecio))} {fondo.monedaNemotecnico}</td>
                            <td>{Math.floor(fondo.tasaPrecio * fondo.cantidad).toLocaleString('es-CL')}</td>
                            <td>
                                <Input
                                    className='money-input'
                                    size='large'
                                    suffix="%"
                                    value={investmentAmounts[index]}
                                    onChange={(e) => handleInvestmentAmountChange(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <strong>
                                    {isNaN(fondo.tasaPrecio * fondo.cantidad * investmentAmounts[index] / 100) || investmentAmounts[index] === 0 ?
                                        0 :
                                        Math.trunc(fondo.tasaPrecio * fondo.cantidad * investmentAmounts[index] / 100).toLocaleString('es-CL')}
                                </strong>
                            </td>

                            <th>
                                <Popconfirm
                                    title="¿Estás seguro de rescatar este fondo?
                                    El cambio de cantidad de cuota se reflejará dentro de 1 día hábil y el proceso de rescate puede demorar hasta 10 días corridos, luego el monto rescatado se depositará a tu cuenta en a lo más 1 día hábil."
                                    onConfirm={() => handleRescue(fondo, investmentAmounts[index])}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                    <Button type="primary" shape="circle" size="large" icon={<LogoutOutlined />} />
                                </Popconfirm>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ListMyFunds;
