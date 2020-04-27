import { NeteaseMusic, BiliClient } from './src/index'
import { writeFileSync } from 'fs'
import configs from './configs'
async function main() {
  const client = new NeteaseMusic(configs.phone, configs.password)
  await client.Login()
  const data = await client.getFavorite()
  console.log(data)
  // const weekData = await client.getWeekData();
  // console.dir(weekData);
  // console.dir(await client.getAllData());

  const bl = new BiliClient(26568174)
  // const data = await bl.getPersonalVideo()
  // writeFileSync('./temp/video.json', JSON.stringify(data, null, 2))
}

main()
