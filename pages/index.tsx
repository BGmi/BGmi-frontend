import { useBangumi } from '~/hooks/use-bangumi';

export default function Bangumi() {
  const { data } = useBangumi();
  console.info(data);
  return (
    <div>bangumi</div>
  );
}
