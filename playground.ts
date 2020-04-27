import { NeteaseMusic, BiliClient } from './src/index'
import { writeFileSync } from 'fs'
async function main() {
  // const client = new NeteaseMusic("15889653693", "Y6nx4$i33y2");
  // await client.Login();
  // const weekData = await client.getWeekData();
  // console.dir(weekData);
  // console.dir(await client.getAllData());

  const bl = new BiliClient(26568174)
  const data = await bl.getPersonalVideo()
  writeFileSync('./temp/video.json', JSON.stringify(data, null, 2))
}

main()
