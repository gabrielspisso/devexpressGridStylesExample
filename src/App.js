import React from "react";

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel
} from "devextreme-react/data-grid";
import CheckBox from "devextreme-react/check-box";
import { customers } from "./data.js";
import "./styles.css";

const GroupCell = (props) => {
  // console.log(props);
  // return <div>{"pipo"}</div>;
  return <div style={{ root: { padding: 0 } }}> </div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.grid = React.createRef();

    this.state = {
      autoExpandAll: true
    };

    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
  }

  render() {
    const defaultColumnProps = {};
    return (
      <div>
        <DataGrid
          ref={this.grid}
          dataSource={customers}
          allowColumnReordering={true}
          showBorders={true}
          onRowPrepared={(e) => {
            if (e.rowType == "group") {
              e.rowElement.style.height = "0";
              const colName = e.columns[0].name;
              const groupValue = e.data.items[0][colName];
              if (groupValue == "Dallas") {
                e.rowElement.style.display = "none";
              }
            }
            e.rowElement.style.padding = "0";
          }}
          onCellPrepared={(e) => {
            if (e.rowType == "group") {
              e.cellElement.style.padding = "0";
            }
          }}
        >
          <GroupPanel visible={true} />
          <SearchPanel visible={true} />
          <Grouping
            autoExpandAll={this.state.autoExpandAll}
            // allowCollapsing={false}
          />
          <Paging defaultPageSize={10} />

          <Column dataField="CompanyName" dataType="string" />
          <Column dataField="Phone" dataType="string" />
          <Column dataField="Fax" dataType="string" />
          <Column groupIndex={0} dataField="City" dataType="string" />
          <Column
            dataField="State"
            dataType="string"
            allowGrouping={false}
            //groupCellComponent={GroupCell}
            //headerCellComponent={GroupCell}
          />
        </DataGrid>

        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox
              text="Expand All Groups"
              value={this.state.autoExpandAll}
              onValueChanged={this.onAutoExpandAllChanged}
            />
          </div>
        </div>
      </div>
    );
  }

  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll
    });
  }
}

export default App;
