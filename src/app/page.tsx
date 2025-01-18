import { fetchData } from "@/services/api";


export default async function Home() {

  await fetchData()
  return (
    <>
    <h1>hello world</h1>
    </>
  );
}
