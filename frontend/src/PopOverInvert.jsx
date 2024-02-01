import { Button, Popover, Input, Typography, message } from 'antd';
import './CSS/PopOverInvert.css';
import React, { useState, useEffect } from 'react';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

const { Text } = Typography;
const backend_URL = import.meta.env.VITE_BACKEND_URL;

const PopOverInvert = ({ fund, balance, clientNumber, clientName }) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [inputSize, setInputSize] = useState('large');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setInputSize('small');
            } else {
                setInputSize('large');
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const hideAndSendEmail = () => {
        setClicked(false);
        setHovered(false);
        if (!investmentAmount.trim()) {
            message.error("Debe ingresar el monto a invertir.");
            return;
        } else if (investmentAmount <= 0) {
            message.error("Debe ingresar un monto positivo.");
            return;
        } else if (isNaN(investmentAmount)) {
            message.error("Ingrese un valor numérico válido para el monto.");
            return;
        }
        const remainingBalance = parseFloat(balance) - investmentAmount;

        if (remainingBalance < 0) {
            message.error("No puede invertir más dinero del que tiene disponible.");
            return;
        }

        fetch(`${backend_URL}/sendInvertFundEmailToExecutive`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "clientName": clientName,
                "clientNumber": clientNumber,
                "investmentAmount": investmentAmount,
                "fundName": fund.name,
                "fundRUN": fund.run,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    message.success("Correo enviado al ejecutivo con éxito");
                } else {
                    message.error("Error al enviar el correo al ejecutivo");
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud HTTP:", error);
            });

        setInvestmentAmount("");
    };

    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
    };
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };

    const clickContent = (<>
        <div style={{ marginRight: '16px' }}>
            <Typography.Title level={5}>Saldo disponible:</Typography.Title>
            <Input
                className='money-input'
                size={inputSize}
                prefix="$"
                suffix="CLP"
                disabled={true}
                value={balance}
            />
        </div>
        <div style={{ marginRight: '16px' }}>
            <Typography.Title level={5}>Monto a invertir:</Typography.Title>
            <Input
                className='money-input'

                size={inputSize}

                prefix="$"
                suffix="CLP"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
            />
        </div>
        <div>
            <Typography.Title level={5}>Saldo restante:</Typography.Title>
            <Input
                className='money-input'
                size={inputSize}
                prefix="$"
                suffix="CLP"
                disabled={true}
                value={balance - investmentAmount}
            />
        </div>
    </>
    );

    return (
        <Popover
            style={{
                width: '100%',
            }}
            title="Invertir en este fondo"
            trigger="hover"
            open={hovered}
            onOpenChange={handleHoverChange}
        >
            <Popover
                placement="bottomRight"
                color="#AAD7D9"
                content={
                    <div>
                        {clickContent}
                        <Text italic>*Las inversiones antes de las 14:00 de días hábiles se reflejará en el mismo día.</Text>
                        <br />
                        <Text italic>En caso contrario se reflejará antes del próximo día hábil.</Text>
                        <br />
                        <Button
                            onClick={hideAndSendEmail}
                            type="primary"
                            size={inputSize}
                            ghost
                            className="centered-button"
                        >
                            Aportar
                        </Button>
                    </div>
                }
                trigger="click"
                open={clicked}
                onOpenChange={handleClickChange}
            >
                <Button
                    shape="circle"
                    icon={<CurrencyExchangeTwoToneIcon />}
                />
            </Popover>
        </Popover>
    );
};
export default PopOverInvert;