import React, { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import styles from "../../App.css";
import customers from "../../JsonFIle/customers.json";
import { CustomerData } from "../Data/CustomerData";
import Pagination from "../Pagination";

function Customer() {
  const mystyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
  const [data, setData] = useState(customers);
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
      customers.sort((a, b) => a.customerID - b.customerID);
    } else if (order === "ascending") {
      if (attribute === "customerID") {
        customers.sort((a, b) => a.customerID - b.customerID);
      } else if (attribute === "companyName") {
        customers.sort(function (a, b) {
          const nameA = a.companyName.toUpperCase();
          const nameB = b.companyName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "contactName") {
        customers.sort(function (a, b) {
          const nameA = a.contactName.toUpperCase();
          const nameB = b.contactName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "country") {
        customers.sort(function (a, b) {
          const nameA = a.address.country.toUpperCase();
          const nameB = b.address.country.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "city") {
        customers.sort(function (a, b) {
          const nameA = a.address.city.toUpperCase();
          const nameB = b.address.city.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "phone") {
        customers.sort((a, b) => a.address.phone - b.address.phone);
      }
    } else {
      if (attribute === "customerID") {
        customers.sort((a, b) => b.customerID - a.customerID);
      } else if (attribute === "companyName") {
        customers.sort(function (a, b) {
          const nameA = a.companyName.toUpperCase();
          const nameB = b.companyName.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
      } else if (attribute === "contactName") {
        customers.sort(function (a, b) {
          const nameA = b.contactName.toUpperCase();
          const nameB = a.contactName.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "country") {
        customers.sort(function (a, b) {
          const nameA = b.address.country.toUpperCase();
          const nameB = a.address.country.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "city") {
        customers.sort(function (a, b) {
          const nameA = b.address.city.toUpperCase();
          const nameB = a.address.city.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (attribute === "phone") {
        customers.sort((a, b) => b.address.phone - a.address.phone);
      }
    }
    setLoading(false);
  };

  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);
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
              <Dropdown.Item eventKey="customerID">Customer ID</Dropdown.Item>
              <Dropdown.Item eventKey="companyName">Company Name</Dropdown.Item>
              <Dropdown.Item eventKey="contactName">Contact Name</Dropdown.Item>
              <Dropdown.Item eventKey="country">Country</Dropdown.Item>
              <Dropdown.Item eventKey="phone">Phone</Dropdown.Item>
              <Dropdown.Item eventKey="city">City</Dropdown.Item>
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
            <Pagination totalPosts={customers.length} paginate={paginate} />
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Customer ID</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Contact Name</th>
                  <th scope="col">Country</th>
                  <th scope="col">Phone</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              <tbody>
                <CustomerData excelData={currentPosts} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Customer;
