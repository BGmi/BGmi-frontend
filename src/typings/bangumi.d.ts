/* eslint-disable camelcase */

declare enum UpdateTime {
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun',
}

declare class Bangumi {
  bangumi_id: number
  bangumi_name: string
  name: string
  cover: string
  data_source: string
  episode: number
  exclude: string
  include: string
  player: { [keys: number]: { player: string } }
  regex: string
  status: 1
  subtitle: string
  update_time: UpdateTime
  updated_time: number
}
