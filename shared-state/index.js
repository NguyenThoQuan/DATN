export const sharedState = {
  data: { tableList: "off" },
  setData(newData) {
    this.data = { ...this.data, ...newData };
    window.dispatchEvent(
      new CustomEvent("sharedState:updated", { detail: this.data })
    );
  },
};
