import React from "react";

interface UsersWrapperProps {
  title: string;
  children: any;
}

const UsersWrapper: React.FC<UsersWrapperProps> = ({ title, children }) => {
  return (
    <section className="mb-12">
      <div className="border-b  border-slate-300 dark:border-slate-700	relative py-5">
        <h3 className="absolute top-[27px] bg-slate-200 dark:bg-black pr-2 ">
          {title}
        </h3>
      </div>
      <ul className="flex flex-wrap">{children}</ul>
    </section>
  );
};

export default UsersWrapper;
