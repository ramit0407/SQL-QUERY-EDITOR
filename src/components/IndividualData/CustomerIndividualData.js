import React from "react";

export const CustomerIndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.customerID}</th>
      <th>{individualExcelData.companyName}</th>
      <th>{individualExcelData.contactName}</th>
      <th>{individualExcelData.address.country}</th>
      <th>{individualExcelData.address.phone}</th>
      <th>{individualExcelData.address.city}</th>
    </>
  );
};
