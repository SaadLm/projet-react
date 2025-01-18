import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link ,Outlet} from 'react-router-dom';

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,

} from '@ant-design/icons';
import {Layout, Menu, theme } from 'antd';
import ListTasks from "./components/ListTasks.jsx";
import AddTask from "./components/AddTask.jsx";



const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon) {
    return {
        key,
        icon,
        label,
    };
}
const items = [
    getItem('Liste des taches', 'list', <PieChartOutlined />),
    getItem('Ajouter une tache', 'ajout', <DesktopOutlined />),

    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const App = () => {


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Router>
            <Layout
                style={{
                    minHeight: '100vh',
                    minWidth: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <nav>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            {/* Update the Menu items to use Links */}
                            {items.map((item) =>

                                    <Menu.Item key={item.key} >
                                        <Link to={`/${item.key}`}>{item.label}</Link>
                                    </Menu.Item>

                                )}
                        </Menu>
                    </nav>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content>

                        <Routes>
                            <Route path="/" element={<Outlet/>}>
                                <Route path="/"  element={<ListTasks/>}></Route>
                                <Route path="/list"  element={<ListTasks/>}></Route>
                                <Route path="/ajout"  element={<AddTask/>}></Route>
                            </Route>
                        </Routes>

                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Gestion des Tâches To-Do (To-Do List Management System) ©{new Date().getFullYear()} Created by Saad Lamouaddan CIW-3
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
};
export default App;
