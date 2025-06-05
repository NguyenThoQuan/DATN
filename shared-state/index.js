export const sharedStateDataDesign = {
  data: { dataD: [] },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateDataDesign:updated", { detail: this.data })
    );
  },
};

export const sharedStateMode = {
  data: { mode: "" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateMode:updated", { detail: this.data })
    );
  },
};

export const sharedStateTableList = {
  data: { tableListMode: "off", dataTable: [] },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateTableList:updated", { detail: this.data })
    );
  },
};

export const sharedStateCreate = {
  data: { createTable: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateCreate:updated", { detail: this.data })
    );
  },
};

export const sharedStateEdit = {
  data: { editTable: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateEdit:updated", { detail: this.data })
    );
  },
};

export const sharedStateDelete = {
  data: { deleteTable: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateDelete:updated", { detail: this.data })
    );
  },
};

export const sharedStateTableListBuild = {
  data: { dataColumn: "" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateTableListBuild:updated", {
        detail: this.data,
      })
    );
  },
};

export const sharedStateColumnPining = {
  data: { columnPining: {} },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateColumnPining:updated", {
        detail: this.data,
      })
    );
  },
};

export const sharedStateExcel = {
  data: { excel: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateExcel:updated", {
        detail: this.data,
      })
    );
  },
};

export const sharedStateBarChart = {
  data: { barChart: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateBarChart:updated", {
        detail: this.data,
      })
    );
  },
};

export const sharedStateTypeChart = {
  data: { type: "bar" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateTypeChart:updated", {
        detail: this.data,
      })
    );
  },
};

export const sharedStateDataBarChart = {
  data: { dataKey: "", series: "" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateDataBarChart:updated", {
        detail: this.data,
      })
    );
  },
};
