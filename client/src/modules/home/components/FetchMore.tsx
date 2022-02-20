import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../shared-components/Button";
import { State } from "../../../store/store";

interface FetchMoreProps {
  fetchFn: Function;
}
const FetchMore: React.FC<FetchMoreProps> = ({ fetchFn }) => {
  const hasMore = useSelector((state: State) => state.roomApi.hasMore);
  const fetchingMore = useSelector(
    (state: State) => state.roomApi.loading.fetchingMore,
  );
  return (
    <>
      {hasMore && (
        <section className="text-center">
          <Button
            loading={fetchingMore}
            fullWidth={false}
            onClick={() => {
              fetchFn();
            }}
          >
            More
          </Button>
        </section>
      )}
    </>
  );
};

export default FetchMore;
