import React from "react";
import PropTypes from "prop-types";

const Table = (props) => {
  //#region - RENDER
  const renderHeader = (data) => {
    return (
      <>
        {data.map((key, index) => (
          <React.Fragment key={index}>
            <th key={index}>{key}</th>
          </React.Fragment>
        ))}
        {props.onEdit && props.onDelete && <th></th>}
        {props.onRemove && <th>Action</th>}
      </>
    );
  };

  const renderBody = (data) => {
    const keys = props.keys;

    const table = data.map((row, index) => {
      return (
        <tr key={index}>
          {keys.map((key, index) => {
            return (
              <React.Fragment key={index}>
                {customCell({ row, key, index })}
              </React.Fragment>
            );
          })}

          {/* CUSTOM FUNCTIONALITIES */}
          {(props.onEdit ||
            props.onDelete ||
            props.onShare ||
            props.onRemove) && (
            <td key={`edit-${index}`}>
              {props.onEdit && (
                <button
                  className="table-options"
                  onClick={() =>
                    props.onEdit(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  Edit
                </button>
              )}
              {props.onDelete && (
                <button
                  className={customDisable(row)} //! custom
                  onClick={() =>
                    props.onDelete(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  &nbsp;|&nbsp;Delete
                </button>
              )}
              {props.onShare && (
                <button
                  className="table-options"
                  onClick={() =>
                    props.onShare(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  &nbsp;|&nbsp;Share
                </button>
              )}
              {props.onRemove && (
                <button
                  className="table-options"
                  onClick={() =>
                    props.onRemove(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  Remove
                </button>
              )}
            </td>
          )}
        </tr>
      );
    });
    return table;
  };
  //#endregion

  //#region - CUSTOM
  const customDisable = (row) => {
    return props.custom?.disableDelete?.id === row.id
      ? "table-options disabled"
      : "table-options";
  };

  const customCell = ({ row, key, index }) => {
    if (props.custom?.usersEmail && key === "id") {
      return <td key={index}>{props.custom.usersEmail(row)}</td>;
    } else if (key === "file") {
      return (
        <td key={index}>
          <button
            className="table-options"
            style={{ color: "blue" }}
            onClick={() => props.fileDownload(row)}
          >
            {row[key]}
          </button>
        </td>
      );
    } else {
      //default
      return <td key={index}>{row[key]}</td>;
    }
  };
  //#endregion

  return (
    <>
      <table id="employee">
        <thead>
          <tr>{renderHeader(props.header)}</tr>
        </thead>
        <tbody>
          {renderBody(props.data)}
          {props.customRender}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  functionKey: PropTypes.string, //For functionality (ex. onEdit(functionKey))
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  custom: PropTypes.object,
  customRender: PropTypes.array,
};
export default Table;

//#region - Sample
// {/* <Table
// header={["Code", "Name", "Category", "Amount"]}
// keys={["pCode", "pName", "category", "pAmount"]}
// functionKey="pCode"
// data={flatItems}
// onEdit={redirectEdit}
// onDelete={showDelete}
// /> */}
//#endregion
