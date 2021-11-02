import { useFilePicker } from "use-file-picker";
import * as XLSX from "xlsx";
import React from "react";
const InstructorFileChooser = () => {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    accept: [".xlsx", ".xls", ".csv"],
    multiple: false,
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (errors.length) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <button onClick={() => openFileSelector()}>Select files </button>
      <br />
      {(() => {
        if (filesContent.length > 0) {
          switch (filesContent[0].name.split(".").pop()) {
            case "xls":
            case "xlsx":
                console.log(filesContent[0].content);
              let workbook = XLSX.read(filesContent, {
                type: 'binary'
              });
              let sheet_name_list = workbook.SheetNames;
              let xlData = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheet_name_list[0]]
              );
              console.log(xlData);
              return xlData.stringify();
            default:
              break;
          }
        }
      })()}
    </div>
  );
};
export default InstructorFileChooser;
