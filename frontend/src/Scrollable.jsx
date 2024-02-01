import React, { useState } from 'react';
import { Button, Tooltip, Table } from 'antd';
import { FileTextOutlined, FilePdfOutlined } from '@ant-design/icons';
import lowRiskImage from './assets/low.jpg';
import moderateRiskImage from './assets/medium.jpg';
import highRiskImage from './assets/high.jpg';
import PopOverInvert from './PopOverInvert';
import './CSS/AntdList.css';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';

const App = ({ fondos, balance, clientNumber, clientName, loggedIn }) => {
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter);
    };

    const datacolumns = [
        {
            title: 'Fondo',
            dataIndex: 'name',
            sorter: (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase(), undefined, { sensitivity: 'base' }),
            key: 'name',
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            fixed: 'left',
            width: 100,
        },
        {
            title: 'AGF',
            key: 'agf',
            dataIndex: 'agf',
            width: 80,
        },
        {
            title: 'Categoría',
            key: 'category',
            dataIndex: 'category',
            width: 100,
        },
        {
            title: 'Serie',
            key: 'series',
            dataIndex: 'series',
            fixed: 'center',
            align: 'center',
            width: 55,
        },
        {
            title: 'Rentabilidad 1M',
            dataIndex: 'monthly',
            sorter: (a, b) => a.monthly - b.monthly,
            key: 'monthly',
            sortOrder: sortedInfo.columnKey === 'monthly' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
            width: 95,
            align: 'center',

        },
        {
            title: 'Rentabilidad YTD',
            dataIndex: 'ytd',
            key: 'ytd',
            sorter: (a, b) => a.ytd - b.ytd,
            sortOrder: sortedInfo.columnKey === 'ytd' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
            width: 95,
            align: 'center',

        },
        {
            title: 'Rentabilidad 12M',
            dataIndex: 'yearly',
            sorter: (a, b) => a.yearly - b.yearly,
            key: 'yearly',
            sortOrder: sortedInfo.columnKey === 'yearly' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
            width: 95,
            align: 'center',

        },
        {
            title: 'Nivel de Riesgo',
            dataIndex: 'riskLevel',
            key: 'riskLevel',
            render: (text) => {
                const riskLevelImage = {
                    Bajo: lowRiskImage,
                    Moderado: moderateRiskImage,
                    Alto: highRiskImage,
                }[text];
                return <img src={riskLevelImage} alt={`${text} Riesgo`} />;
            },
            width: 70,
            align: 'center',
        },
        {
            title: 'Regla-mento',
            dataIndex: 'bylawLink',
            key: 'bylawLink',
            render: (text) => (
                <Tooltip title="Abrir Reglamento Interno">
                    <Button
                        shape="circle"
                        type='primary' ghost
                        icon={<FilePdfOutlined />}
                        onClick={() => window.open(text, '_blank')}
                    />
                </Tooltip>
            ),
            width: 60,
            align: 'center',
        },
        {
            title: 'Ficha',
            dataIndex: 'dataSheetLink',
            key: 'dataSheetLink',
            render: (text) => (
                <Tooltip title="Abrir ficha del fondo">
                    <Button
                        shape="circle"
                        type='primary' ghost
                        icon={<FileTextOutlined />}
                        onClick={() => window.open(text, '_blank')}
                    />
                </Tooltip>
            ),
            align: 'center',
            width: 60,
        },
        {
            title: 'Invertir',
            dataIndex: 'invert',
            key: 'invert',
            render: (_, record) => {
                if (loggedIn) {
                    return <PopOverInvert fund={record} balance={balance} clientNumber={clientNumber} clientName={clientName} />;
                } else {
                    return (
                        <Button
                            shape="circle"
                            icon={<CurrencyExchangeTwoToneIcon />}
                            onClick={() => window.open('https://portalclientes.vectorcapital.cl/sign-in', '_blank')}
                        />
                    );
                }
            },
            align: 'center',
            fixed: 'right',
            width: 65,
        },
    ];
    return (<>
        <Table
            columns={datacolumns}
            dataSource={fondos}
            onChange={handleChange}
            rowKey="id"
            size='small'
            tableLayout='fixed'
            sortDirections={["descend", "ascend", "descend"]}
            locale={{
                triggerDesc: 'Ordenar ascendentemente',
                triggerAsc: 'Ordenar descendentemente',
                cancelSort: 'Cancelar ordenamiento',
            }}
            scroll={{
                x: 1350,
                y: 600,
            }}
            pagination={{
                locale: { items_per_page: "/ página" },
            }}
        />
    </>
    )
};
export default App;