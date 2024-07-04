import React, { useState } from 'react';
import Login from '../components/Login';
import Xy_click from '../components/Xy_click';
import { Routes, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../css/inputs.css';

const Home = () => {
      const navigate = useNavigate();

    return (
      <img className='homeImg' width={100} height={100} src="https://img.freepik.com/premium-photo/cctv-tool-twilight-sky-backgroundequipment-security-systems_1048944-29063872.jpg?w=740" />
    );
};

export default Home;
