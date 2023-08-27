import { Navigation } from '@/components/layout/Navigation';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren<{ params: { calendarId: string } }>> = ({
  params: { calendarId },
  children,
}) => {
  return (
    <div>
      <div className="mt-2 flex justify-center">
        <Navigation calendarId={calendarId} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
