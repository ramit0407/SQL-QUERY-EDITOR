import React, { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../../App.css";
import { Button } from "react-bootstrap";

import products from "../../JsonFIle/products.json";
import { ProductData } from "../Data/ProductData";
import Pagination from "../Pagination";

function Product() {
  const mystyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("Order");
  const [attribute, setAttribute] = useState("Attribute");
  const [loading, setLoading] = useState(true);
  const handleOrder = (event) => {
    setLoading(true);
    setOrder(event);
  };
  const handleAttribute = (event) => {
    setAttribute(event);
    setLoading(true);
  };

  const handleSubmit = () => {
    if (order === "Order" || order === "none") {
      products.sort((a, b) => a.productID - b.productID);
    } else if (order === "ascending") {
      if (attribute === "productID") {
        products.sort((a, b) => a.productID - b.productID);
      } else if (attribute === "name") {
        console.log("name");
        products.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "quantityPerUnit") {
        products.sort((a, b) => a.quantityPerUnit - b.quantityPerUnit);
      } else if (attribute === "unitPrice") {
        products.sort((a, b) => a.unitPrice - b.unitPrice);
      } else if (attribute === "unitsInStock") {
        products.sort((a, b) => a.unitsInStock - b.unitsInStock);
      } else if (attribute === "unitsOnOrder") {
        products.sort((a, b) => a.unitsOnOrder - b.unitsOnOrder);
      }
    } else {
      if (attribute === "productID") {
        products.sort((a, b) => b.productID - a.productID);
      } else if (attribute === "name") {
        products.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      } else if (attribute === "quantityPerUnit") {
        products.sort((a, b) => b.quantityPerUnit - a.quantityPerUnit);
      } else if (attribute === "unitPrice") {
        products.sort((a, b) => b.unitPrice - a.unitPrice);
      } else if (attribute === "unitsInStock") {
        products.sort((a, b) => b.unitsInStock - a.unitsInStock);
      } else if (attribute === "unitsOnOrder") {
        products.sort((a, b) => b.unitsOnOrder - a.unitsOnOrder);
      }
    }
    setLoading(false);
  };

  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (loading === false) handleSubmit();
  }, [attribute, order]);
  return (
    <>
      <div style={mystyle}>
        <DropdownButton
          align="end"
          title={order}
          id="dropdown-menu-align-end"
          className={styles.dropdown}
          onSelect={handleOrder}
        >
          <Dropdown.Item eventKey="none">None</Dropdown.Item>
          <Dropdown.Item eventKey="ascending">Ascending</Dropdown.Item>
          <Dropdown.Item eventKey="descending">Descending</Dropdown.Item>
        </DropdownButton>
        {order !== "Table" && order !== "none" && (
          <>
            <DropdownButton
              align="end"
              title={attribute}
              id="dropdown-menu-align-end"
              className={styles.dropdown}
              onSelect={handleAttribute}
            >
              <Dropdown.Item eventKey="productID">ProductID</Dropdown.Item>
              <Dropdown.Item eventKey="name">Name</Dropdown.Item>
              <Dropdown.Item eventKey="quantityPerUnit">
                quantityPerUnit
              </Dropdown.Item>
              <Dropdown.Item eventKey="unitPrice">Unit Price</Dropdown.Item>
              <Dropdown.Item eventKey="unitsInStock">
                Units In Stock
              </Dropdown.Item>
              <Dropdown.Item eventKey="unitsOnOrder">
                Units On Order
              </Dropdown.Item>
            </DropdownButton>
          </>
        )}
        <Button
          style={{ margin: "25px" }}
          variant="primary"
          onClick={handleSubmit}
        >
          submit
        </Button>
      </div>
      {loading ? (
        <div style={mystyle}>SELECT ORDER AND ATTRIBUE TO DISPLAY TABLE</div>
      ) : (
        <div>
          <div style={mystyle}>
            <Pagination totalPosts={products.length} paginate={paginate} />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ProductID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity Per Unit</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Units In Stock</th>
                  <th scope="col">Units On Order</th>
                </tr>
              </thead>
              <tbody>
                <ProductData excelData={currentPosts} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
