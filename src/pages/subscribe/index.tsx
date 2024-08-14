import { useMemo, useReducer, useState } from 'react';

import { CiFilter } from 'react-icons/ci';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  TabPanel,
} from '@chakra-ui/react';

import { useAtom } from 'jotai';
import { useCalendar } from '~/hooks/use-calendar';
import { useColorMode } from '~/hooks/use-color-mode';
import { bangumiFilterAtom, type DataKind } from '~/hooks/use-bangumi';

import Auth from '~/components/auth';
import CalendarTab from '~/components/calendar-tab';
import SubscribePanel from '~/components/subscribe-panel';

import type { Calendar, CalendarDataEntries, CalendarDataKey, WeekCalendar } from '~/types/calendar';

interface FilterOptionsState {
  subscribed: boolean;
  unSubscribed: boolean;
}

interface FilterOptionsAction {
  type: 'subscribed' | 'unSubscribed';
  mutate: () => void;
}

const filterOptionsReducer = (state: FilterOptionsState, action: FilterOptionsAction) => {
  switch (action.type) {
    case 'subscribed':
      action.mutate();
      return {
        subscribed: !state.subscribed,
        unSubscribed: false,
      };
    case 'unSubscribed':
      action.mutate();
      return {
        unSubscribed: !state.unSubscribed,
        subscribed: false,
      };
    default:
      throw new Error('Unexpected action');
  }
};

const initialFilterOptionsState: FilterOptionsState = {
  subscribed: false,
  unSubscribed: false,
};

interface FilterOptionsMenuProps {
  state: FilterOptionsState;
  dispatch: (action: FilterOptionsAction) => void;
  mutate: () => void;
}

function FilterOptionsMenu({ state, dispatch, mutate }: FilterOptionsMenuProps) {
  const { colorMode } = useColorMode();
  const menuItemBg = colorMode === 'dark' ? 'blackAlpha.400' : 'blackAlpha.200';

  const [bangumiShow, setBangumiShow] = useAtom(bangumiFilterAtom);

  const handleShow = async (type: DataKind) => {
    setBangumiShow(p => (p === type ? 'both' : type));
  };

  return (
    <Menu autoSelect={false} closeOnSelect={false}>
      <MenuButton
        position="absolute"
        top="0"
        right="0"
        as={Button}
        aria-label="Options"
        rightIcon={<CiFilter size="16" style={{ marginLeft: '-4px' }} />}
        bg="transparent!"
        p="0"
        fontWeight="normal"
      >
        筛选
      </MenuButton>
      <MenuList minW="24">
        <MenuItem
          justifyContent="center"
          bg={state.subscribed ? menuItemBg : 'transparent'}
          onClick={() => dispatch({ type: 'subscribed', mutate })}
        >
          已订阅
        </MenuItem>
        <MenuItem
          justifyContent="center"
          bg={state.unSubscribed ? menuItemBg : 'transparent'}
          onClick={() => dispatch({ type: 'unSubscribed', mutate })}
        >
          未订阅
        </MenuItem>
        <Divider />
        <MenuItem
          justifyContent="center"
          bg={bangumiShow === 'new' ? menuItemBg : 'transparent'}
          onClick={() => handleShow('new')}
        >
          仅显示新番
        </MenuItem>
        <MenuItem
          justifyContent="center"
          bg={bangumiShow === 'old' ? menuItemBg : 'transparent'}
          onClick={() => handleShow('old')}
        >
          仅显示旧番
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function Subscribe() {
  const { data, mutate } = useCalendar();

  const [state, dispatch] = useReducer(filterOptionsReducer, initialFilterOptionsState);

  const calendarData = useMemo(() => {
    if (!data) return;

    // deep clone
    const sortData = window.structuredClone(data) as Calendar;
    Object.values(sortData.data).forEach(week => {
      week?.sort(b => (!b.status ? 1 : -1));
    });

    const filterData = sortData.data;
    for (const [week, weekData] of Object.entries(sortData.data) as CalendarDataEntries) {
      filterData[week] = weekData?.filter(bangumi => {
        if (state.subscribed) return bangumi.status;

        if (state.unSubscribed) return !bangumi.status;

        return true;
      });
    }

    return filterData;
  }, [data, state]);

  const tabListItems = useMemo(() => Object.keys(calendarData ?? []) as CalendarDataKey[], [calendarData]);
  const tabPanelsItems = useMemo(() => Object.entries(calendarData ?? []) as CalendarDataEntries, [calendarData]);

  const searchData = useMemo(() => tabPanelsItems.flatMap(([_, bangumis]) => bangumis ?? []), [tabPanelsItems]);

  if (!calendarData || tabListItems.length === 0 || tabPanelsItems.length === 0) {
    return (
      <Flex justifyContent="center" alignContent="center" mt="44">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Auth to="/subscribe">
      <CalendarTab
        customElement={<FilterOptionsMenu state={state} dispatch={dispatch} mutate={mutate} />}
        tabListItems={tabListItems}
        tabListProps={{ mr: '16' }}
        boxProps={{ mr: '16' }}
        type="subscribe"
      >
        {tabPanelsItems.map(([week, bangumis]) => (
          <SubscribePanel key={week} bangumis={bangumis} />
        ))}
        <TabPanel mt="6">
          <SearchPanel data={searchData} />
        </TabPanel>
      </CalendarTab>
    </Auth>
  );
}

function SearchPanel({ data }: { data: WeekCalendar[] }) {
  const [key, setKey] = useState('');

  const filterData = useMemo(() => {
    return data.sort(b => (!b.status ? 1 : -1)).filter(_d => _d.name.includes(key));
  }, [data, key]);

  return (
    <>
      <Input
        placeholder="搜索动画片"
        maxW="96"
        value={key}
        display="block"
        mx="auto"
        onChange={e => setKey(e.target.value)}
      />
      <Box mt="8">
        <SubscribePanel bangumis={filterData} />
      </Box>
    </>
  );
}
