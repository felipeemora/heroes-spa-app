import { HeroList } from "../components/HeroList"

const publisher = 'DC Comics';

export const DcPage = () => {
  return (
    <>
      <h1>DC Comics</h1>
      <hr />

      <HeroList publisher={publisher} />
    </>
  )
}
