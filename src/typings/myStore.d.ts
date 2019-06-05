/* eslint-disable camelcase */

declare class AppState {
  bangumi: Bangumi[]
  hasBangumiIndexFetched: boolean
  bangumiOld: Bangumi[]
  hasBangumiOldFetched: boolean
  isLogin: boolean
  token: '' | boolean
  danmaku_api: string
  coverRoot: string
  bgmiVersion: string
  cal: any
  calFetched: boolean
  history: any
}
