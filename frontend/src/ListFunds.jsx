import { MoneyCollectTwoTone, FileTextOutlined, FilePdfOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip, Popover } from 'antd';
import './CSS/ListFunds.css';
import lowRiskImage from './assets/low.jpg';
import moderateRiskImage from './assets/medium.jpg';
import highRiskImage from './assets/high.jpg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import PopOverInvert from './PopOverInvert';

const ListFunds = ({ fondos }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Fondo</th>
          <th>AGF</th>
          <th>Categoría</th>
          <th>Serie</th>
          <th>1M
            <Tooltip title="Rentabilidad de 1 mes">
              <Button shape="circle" size='small' icon={<QuestionCircleOutlined />} />
            </Tooltip>
          </th>
          <th>YTD
            <Tooltip title="Rentabilidad Year-to-Date, también conocido como Año hasta la Fecha o Acumulado del Año">
              <Button shape="circle" size='small' icon={<QuestionCircleOutlined />} />
            </Tooltip>
          </th>
          <th>12M
            <Tooltip title="Rentabilidad de 12 mes">
              <Button shape="circle" size='small' icon={<QuestionCircleOutlined />} />
            </Tooltip>
          </th>
          <th>
            Riesgo
            <Tooltip title={<div>Nivel de riesgo:<br />Bajo: verde,<br />Moderado: amarillo,<br />Alto: rojo.</div>}>
              <Button shape="circle" size='small' icon={<QuestionCircleOutlined />} />
            </Tooltip>
          </th>
          <th>Reglamento</th>
          <th>Ficha</th>
          <th>Invertir</th>
        </tr>
      </thead>
      <tbody>
        {fondos.map((fondo) => (
          <tr key={fondo.id}>
            <td>{fondo.name}</td>
            <td>{fondo.agf}</td>
            <td>{fondo.category}</td>
            <td>{fondo.series}</td>
            <td className={fondo.monthly.startsWith('-') ? 'rojo' : 'verde'}>{fondo.monthly}</td>
            <td className={fondo.ytd.startsWith('-') ? 'rojo' : 'verde'}>{fondo.ytd}</td>
            <td className={fondo.yearly.startsWith('-') ? 'rojo' : 'verde'}>{fondo.yearly}</td>
            <td>
              {fondo.riskLevel === 'Bajo' && (
                <img src={lowRiskImage} alt="Bajo Riesgo" />
              )}
              {fondo.riskLevel === 'Moderado' && (
                <img src={moderateRiskImage} alt="Moderado Riesgo" />
              )}
              {fondo.riskLevel === 'Alto' && (
                <img src={highRiskImage} alt="Alto Riesgo" />
              )}
            </td>
            <td>
              <Tooltip title="Descargar Reglamento Interno">
                <Button
                  shape="circle"
                  type='primary' ghost
                  icon={<FilePdfOutlined />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
            <td>
              <Tooltip title="Descargar Ficha">
                <Button
                  shape="circle" 
                  type='primary' ghost
                  icon={<FileTextOutlined />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip>
            </td>
            <td>
              {/* <Tooltip title="Invertir en este fondo">
                <Button
                  type="primary" ghost
                  shape="circle"
                  icon={<MoneyCollectTwoTone />}
                  onClick={() => window.open('https://www.vectorcapital.cl/', '_blank')}
                />
              </Tooltip> */}
              <PopOverInvert fund={fondo}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ListFunds;
