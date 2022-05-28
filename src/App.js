import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Product from "./components/Table/Product";
import Customer from "./components/Table/Customer";
import styles from "./App.css";

function App() {
  const [type, setType] = useState("Table");
  const handleTable = (event) => {
    setType(event);
  };
  return (
    <div style={{ margin: "auto" }}>
      <div>
        <DropdownButton
          align="end"
          title={type}
          id="dropdown-menu-align-end"
          className={styles.dropdown}
          style={{ marginLeft: "45%" }}
          onSelect={handleTable}
        >
          <Dropdown.Item eventKey="products">Products Table</Dropdown.Item>
          <Dropdown.Item eventKey="customers">Customers Table</Dropdown.Item>
        </DropdownButton>
        {type === "products" && <Product />}
        {type === "customers" && <Customer />}
      </div>
    </div>
  );
}

export default App;
