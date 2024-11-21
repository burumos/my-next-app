import { fetchMemos } from "./action";
import MemoItem from "./memo-item";

export default async function MemoList() {
  const list = await fetchMemos();
  return list.map((item) => <MemoItem {...item} />);
}
