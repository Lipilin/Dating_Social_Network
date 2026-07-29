import { SearchGender } from './partials/searchForm/SearchGender'
import { SearchInterests } from './partials/searchForm/SearchInterests'
import { SearchBottom } from './partials/searchForm/SearchBottom'

export function SearchForm() {
  return (
    <section className="search">
      <div className="container">
        <form action="">
          <div className="search__top">
            <SearchGender />
            <div className="search__top-item">
                <SearchInterests categories={[]}/>
            </div>
            <div className="search__top-item">
              <div className="place">
                <input type="text" placeholder=" " />
                <label className="label">От куда</label>
              </div>
            </div>
            <div className="search__top-item">
              <div className="place">
                <input type="text" placeholder=" " />
                <label htmlFor="">Куда</label>
              </div>
            </div>
          </div>
          <SearchBottom />
        </form>
      </div>
    </section>
  )
}