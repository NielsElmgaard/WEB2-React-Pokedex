import {Routes, Route, HashRouter} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'

import "./App.css";


function App() {

    return (
        <HashRouter>
            <div className="app-container">
                <Header />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
}

export default App;
