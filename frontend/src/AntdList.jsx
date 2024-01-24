import React, { useState } from 'react';
import { Button, Tooltip, Space, Table } from 'antd';
import { FileTextOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import './CSS/ListFunds.css';
import lowRiskImage from './assets/low.jpg';
import moderateRiskImage from './assets/medium.jpg';
import highRiskImage from './assets/high.jpg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import PopOverInvert from './PopOverInvert';

import { ConfigProvider } from 'antd';
const text = <span>prompt text</span>;
const buttonWidth = 80;

const ListFunds = ({ fondos }) => {
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'Fondo',
            dataIndex: 'name',
        },
        {
            title: 'AGF',
            dataIndex: 'agf',
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
        },
        {
            title: 'Serie',
            dataIndex: 'series',
        },
        {
            title: 'Rentabilidad 1M',
            dataIndex: 'monthly',
            sorter: (a, b) => a.monthly - b.monthly,
            key: 'monthly',
            sortOrder: sortedInfo.columnKey === 'monthly' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
        },
        {
            title: 'Rentabilidad YTD',
            dataIndex: 'ytd',
            key: 'ytd',
            sorter: (a, b) => a.ytd - b.ytd,
            sortOrder: sortedInfo.columnKey === 'ytd' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,

        },
        {
            title: 'Rentabilidad 12M',
            dataIndex: 'yearly',
            sorter: (a, b) => a.yearly - b.yearly,
            key: 'yearly',
            sortOrder: sortedInfo.columnKey === 'yearly' ? sortedInfo.order : null,
            render: (text) => <span className={text.startsWith('-') ? 'rojo' : 'verde'}>{`${text}%`}</span>,
        },
        {
            title: 'Nivel de Riesgo',
            dataIndex: 'riskLevel',
            render: (text) => {
                const riskLevelImage = {
                    Bajo: lowRiskImage,
                    Moderado: moderateRiskImage,
                    Alto: highRiskImage,
                }[text];
                return <img src={riskLevelImage} alt={`${text} Riesgo`} />;
            },
        },
        {
            title: 'Reglamento',
            dataIndex: 'bylawLink',
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
        },
        {
            title: 'Ficha',
            dataIndex: 'dataSheetLink',
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
        },
        {
            title: 'Invertir',
            dataIndex: 'invert',
            render: (_, record) => <PopOverInvert fund={record} />,
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={fondos}
                onChange={handleChange}
                rowKey="id"
                size='small'
                pagination={false}
            />
        </div>
    );
};

export default ListFunds;
