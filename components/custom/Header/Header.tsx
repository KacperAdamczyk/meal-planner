import { FC } from 'react';

interface Props {
  header: string;
  headerItalic: string;
  subHeader?: string;
  subHeaderItalic?: string;
}

export const Header: FC<Props> = ({
  header,
  headerItalic,
  subHeader,
  subHeaderItalic,
}) => (
  <>
    <h1 className="text-2xl">
      {header} <span className="italic">{headerItalic}</span>
    </h1>
    {subHeader && subHeaderItalic && (
      <h3 className="text-sm">
        {subHeader} <span className="italic">{subHeaderItalic}</span>
      </h3>
    )}
  </>
);
