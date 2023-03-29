export interface FetchFilterResp {
  version: string
  latest_version: string
  frontend_version: string
  status: string
  lang: string
  danmaku_api: string
  data: {
    name: string
    subtitle_group: string[]
    followed: string[]
    include: string | null
    exclude: string | null
    regex: string | null
  }
  message: string
}

export interface SaveFilterBody {
  name: string
  include: string | null
  exclude: string | null
  regex: string | null
  subtitle: string | null
}
