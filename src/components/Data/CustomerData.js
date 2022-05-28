import React from "react";
import { CustomerIndividualData } from "../IndividualData/CustomerIndividualData";

export const CustomerData = ({ excelData }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.Id}>
      <CustomerIndividualData individualExcelData={individualExcelData} />
    </tr>
  ));
};
