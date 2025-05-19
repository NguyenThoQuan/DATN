export const sharedStateTableList = {
  data: { tableListMode: "off" },
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
