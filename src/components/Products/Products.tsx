import GribPage from "../GridPage/GribPage";
import PaginatePage from "../PaginatePage";
import { st, classes } from "./Products.st.css";

const Products = () => {
  return (
    <div className={st(classes.root)}>
      <header className={st(classes.headerPagePro)}>
        <h1>Products</h1>
      </header>
      <main className={st(classes.pageContent)}>
        <div className={st(classes.btnActionPage)}>
          <div className={st(classes.addBtn)}>
            <button className={st(classes.btnPrimary)} title="Add Product">
              Add Product
            </button>
            <button className={st(classes.btnPrimary)}>
              <span>Select</span>
            </button>
          </div>
        </div>

        <div className={st(classes.actionPage)}>
          <div className={st(classes.actionPageTop)}>
            <div>
              <input
                type="text"
                placeholder="Search by keyword"
                className={st(classes.inputSearch)}
              />
            </div>
            <div>
              <button className={st(classes.btnFilter)}>Filters</button>
              <button className={st(classes.btnColumns)}>Columns</button>
            </div>
          </div>
          <div className={st(classes.actionPageBottom)}>
            <div>
              <button>Actions</button>
            </div>
            <div>
              <PaginatePage />
            </div>
          </div>
        </div>
        <GribPage />
      </main>
    </div>
  );
};

export default Products;
