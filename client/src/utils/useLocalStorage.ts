interface Save {
  name: string;
  value?: string;
}
export const useLocalStorage = ({ name, value }: Save) => {
  if (value) {
    localStorage.setItem(name, JSON.stringify(value));
    return value;
  }

  const jsonValue = localStorage.getItem(name);
  if (jsonValue) return JSON.parse(jsonValue);

  return "";
};

export const getTheme = () => {
  const theme = useLocalStorage({ name: "theme" });
  if (
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    return "dark";
  }
  return "light";
};

export const toggleTheme = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.classList.remove("dark");
    return useLocalStorage({ name: "theme", value: "light" });
  }
  document.documentElement.classList.add("dark");
  return useLocalStorage({ name: "theme", value: "dark" });
};
