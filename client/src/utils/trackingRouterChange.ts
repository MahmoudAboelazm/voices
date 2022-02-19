import { Router } from "next/router";
import { useEffect, useState } from "react";

export const trackingRouterChange = () => {
  const [change, setChange] = useState(false);
  useEffect(() => {
    const start = () => setChange(true);
    const end = () => setChange(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return change;
};
