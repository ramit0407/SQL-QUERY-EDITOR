import React from "react";

export const ProductIndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.productID}</th>
      <th>{individualExcelData.name}</th>
      <th>{individualExcelData.quantityPerUnit}</th>
      <th>{individualExcelData.unitPrice}</th>
      <th>{individualExcelData.unitsInStock}</th>
      <th>{individualExcelData.unitsOnOrder}</th>
    </>
  );
};
