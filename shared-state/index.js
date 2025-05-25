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
  data: { tableListMode: "off", createTable: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedStateTableList:updated", { detail: this.data })
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
