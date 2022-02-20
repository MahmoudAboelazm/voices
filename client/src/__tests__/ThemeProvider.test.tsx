import "../__mocks__/matchMedia.mock";

import { render } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../context/ThemeProvider";

describe("ThemeProvider testing", () => {
  test("Expect ThemeProvider to toggle between dark and light mode!", async () => {
    jest.spyOn(localStorage.__proto__, "setItem");
    const TestComponent = () => {
      const theme = useTheme();
      return (
        <button data-testid="themeToggleButton" onClick={() => theme.toggle()}>
          {theme.value}
        </button>
      );
    };
    const wrapper = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const button = await wrapper.findByTestId("themeToggleButton");
    expect(button.textContent).toBe("dark");
    button.click();
    expect(button.textContent).toBe("light");
    button.click();
    expect(button.textContent).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
});
