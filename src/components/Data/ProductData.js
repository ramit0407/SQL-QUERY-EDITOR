import React from "react";
import { ProductIndividualData } from "../IndividualData/ProductIndividualData";

export const ProductData = ({ excelData }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.Id}>
      <ProductIndividualData individualExcelData={individualExcelData} />
    </tr>
  ));
};
