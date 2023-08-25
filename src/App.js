import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import store from "./redux/store";
import CurrencyConverter from "./components/CurrencyConverter";
import ExchangeRateDisplay from "./components/ExchangeRateDisplay";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<CurrencyConverter />} />
              <Route path="/exchange-rates" element={<ExchangeRateDisplay />} />
              {/* <Route path="/historical-chart" element={<HistoricalChart />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
