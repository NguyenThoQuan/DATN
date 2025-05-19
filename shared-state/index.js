export const sharedStateTableList = {
  data: "Dữ liệu ban đầu",
  setData(newData) {
    this.data = newData;
    window.dispatchEvent(
      new CustomEvent("sharedState:updated", { detail: this.data })
    );
  },
};
