import { TabPanel } from '@chakra-ui/react';
import type { WeekCalendar } from '~/types/calendar';
import SubscribeCard from './subscribe-card';

interface Props {
  bangumis: WeekCalendar[] | undefined;
}

export default function SubscribePanel({ bangumis }: Props) {
  return (
    <TabPanel
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(18rem, 1fr))"
      gridTemplateRows="1fr"
      justifyContent="center"
      gap={4}
      px="0"
      pt="5"
    >
      {bangumis?.map(bangumi => <SubscribeCard key={bangumi.id} bangumi={bangumi} />)}
    </TabPanel>
  );
}
