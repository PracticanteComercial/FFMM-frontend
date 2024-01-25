import { Button, Popover, Input, Typography, message } from 'antd';
import './CSS/PopOverInvert.css';
import React, { useState } from 'react';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

const { Text, Link } = Typography;
const backend_URL = import.meta.env.VITE_BACKEND_URL;

const PopOverInvert = ({ fund, balance }) => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState("");

    const hideAndSendEmail = () => {
        setClicked(false);
        setHovered(false);

        // Verifica si el input no está vacío
        if (!investmentAmount.trim()) {
            message.error("Debe ingresar el monto a invertir.");
            return;
        }

        const remainingBalance = balance - investmentAmount;

        // Verifica si el monto de inversión es mayor que el saldo disponible
        if (remainingBalance < 0) {
            message.error("No puede invertir más dinero del que tiene disponible.");
            return;
        }

        // Realiza la solicitud HTTP al backend
        fetch(`${backend_URL}/sendEmailToExecutive`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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

    const clickContent = (
        <div className="flex-container" style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '16px' }}>
                <Typography.Title level={5}>Saldo disponible:</Typography.Title>
                <Input
                    className='money-input'
                    size='large'
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
                    size='large'
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
                    size='large'
                    prefix="$"
                    suffix="CLP"
                    disabled={true}
                    value={balance - investmentAmount}
                />
            </div>
        </div>
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
                        <Text italic>*Al hacer click en el botón, hacemos llegar un correo a uno de nuestros ejecutivos para hacer efectivo su inversión.</Text>
                        <br />

                        <Button
                            onClick={hideAndSendEmail}
                            type="primary"
                            size='large'
                            // danger
                            ghost
                            className="centered-button"
                        >
                            Avisar a un ejecutivo Vector vía correo
                        </Button>
                    </div>
                }
                // title="Ingrese el valor"
                trigger="click"
                open={clicked}
                onOpenChange={handleClickChange}
            >

                <Button
                    // type="primary" ghost 
                    shape="circle"
                    icon={<CurrencyExchangeTwoToneIcon />}
                />
            </Popover>
        </Popover>
    );
};
export default PopOverInvert;