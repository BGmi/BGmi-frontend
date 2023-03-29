import { TabPanel } from '@chakra-ui/react';
import type { WeekCalendar } from '~/types/calendar';
import SubscribeCard from './subscribe-card';

interface Props {
  bangumis: WeekCalendar[]
}

export default function SubscribePanel({ bangumis }: Props) {
  return (
    <TabPanel
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(14rem, 1fr))"
      gridTemplateRows="1fr"
      justifyContent="center"
      gap={8}
    >
      {bangumis.map(bangumi => (
        <SubscribeCard key={bangumi.id} bangumi={bangumi} />
      ))}
    </TabPanel>
  );
}
