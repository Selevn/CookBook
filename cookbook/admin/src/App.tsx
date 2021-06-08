import React from 'react';
import Menu from "./components/menu/Menu";
import './constants.css'
import './index.css'
import MyRouter from "./Router";

const App = () => {
    return (
        <>
            <Menu>
                <MyRouter/>
            </Menu>
        </>
    );
}

export default App;
