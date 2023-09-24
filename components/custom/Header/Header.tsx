import { FC, PropsWithChildren } from 'react';

interface Props {
  header: string;
  headerItalic: string;
  subHeader?: string;
  subHeaderItalic?: string;
}

export const Header: FC<PropsWithChildren<Props>> = ({
  header,
  headerItalic,
  subHeader,
  subHeaderItalic,
  children,
}) => (
  <div className="grid grid-cols-[auto_1fr]">
    <h1 className="col-span-1 row-span-1 text-2xl">
      {header} <span className="italic">{headerItalic}</span>
    </h1>
    {subHeader && subHeaderItalic && (
      <h3 className="col-span-1  row-span-1 row-start-2 text-sm">
        {subHeader} <span className="italic">{subHeaderItalic}</span>
      </h3>
    )}
    <div className="col-start-2 row-span-2 self-center justify-self-end">
      {children}
    </div>
  </div>
);
