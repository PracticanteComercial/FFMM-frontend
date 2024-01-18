import { MoneyCollectTwoTone } from '@ant-design/icons';
import { Button, Popover, Input, Typography, message } from 'antd';
import './CSS/PopOverInvert.css';
import React, { useState } from 'react';



const PopOverInvert = () => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const hideAndSendEmail = () => {
        setClicked(false);
        setHovered(false);
    };
    const handleHoverChange = (open) => {
        setHovered(open);
        setClicked(false);
    };
    const handleClickChange = (open) => {
        setHovered(false);
        setClicked(open);
    };
    const clickContent = <div className="flex-container">
        <Typography.Title level={5}>Monto a invertir:</Typography.Title>
        <Input className='money-input' size='large' prefix="$" suffix="CLP" />
    </div>;

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
                title="Ingrese el valor"
                trigger="click"
                open={clicked}
                onOpenChange={handleClickChange}
            >
                <Button
                    type="primary" ghost
                    shape="circle"
                    icon={<MoneyCollectTwoTone />}
                />
            </Popover>
        </Popover>
    );
};
export default PopOverInvert;