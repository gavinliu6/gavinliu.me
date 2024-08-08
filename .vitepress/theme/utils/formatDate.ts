import dayjs from 'dayjs'

export default function (d: string): string {
  return dayjs(d).format('YYYY 年 M 月 D 日')
}
