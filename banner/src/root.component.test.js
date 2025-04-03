import { render } from "@testing-library/react";
import Banner from "./root.component";

describe("Banner component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<Banner name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
