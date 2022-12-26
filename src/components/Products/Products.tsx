import ColumnPageType from "../ColumnPageType/";
import PaginatePage from "../PaginatePage";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  Magento_Page,
  sortColumnsOrder,
} from "../../store/magentoPageGridReducer";
import ViewLength from "../ViewLength";
import HideShowColumns from "../HideShowColumns";
import Search from "../Search";
import ColumnActions from "../ColumnActions";
import ColumnCheck from "../ColumnCheck";
import ActionsSelect from "../ActionsSelect";

import {
  columnDataLenght,
  fiterDataByKeyword,
  getPaginatedData,
  searchFilters,
} from "../ColumnPageType/ColumnPageType";
import FiltersData from "../FiltersData";
import { st, classes } from "./Products.st.css";

const Products = () => {
  const data: Magento_Page = useSelector(
    (state: { magentopage: Magento_Page }) => state.magentopage
  );
  const columns: any = data.data.columns;

  const columnOrder: any = data.data.columnOrder;
  let tasks: any = data.data.tasks;
  const searchData = data.searchData;
  const typeArr = data.typeArr;
  const sizeData = data.valueChange;
  const currentPage = data.currentPage;
  const objFilters: any = data.objFilters;

  const dispatch = useDispatch();
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (draggableId === "column-9") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder: string[] = Array.from(columnOrder);

      newColumnOrder.splice(source.index, 1);

      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(sortColumnsOrder(newColumnOrder));
    }
  };

  if (_.some(objFilters, (obj) => obj.value !== "")) {
    tasks = fiterDataByKeyword(tasks, objFilters);
  }
  if (searchData !== "") {
    tasks = searchFilters(tasks, searchData);
  }

  tasks =
    typeArr === "DATA_SET_LENGTH"
      ? columnDataLenght(tasks, sizeData)
      : getPaginatedData(tasks, currentPage, sizeData);
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
            <Search />
            <div className={st(classes.actionPageWrapLeft)}>
              <FiltersData />
              <HideShowColumns />
            </div>
          </div>
          <div className={st(classes.actionPageBottom)}>
            <ActionsSelect />
            <div className={st(classes.dataGridPagerWrap)}>
              <ViewLength />
              <label className={st(classes.textPage)}>per page</label>
              <PaginatePage />
            </div>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided, snapshot) => (
              <div
                className={st(classes.pageColumns, {
                  isFalseTrue: snapshot.isDraggingOver,
                })}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ColumnCheck />
                {_.map(columnOrder, (columnId, index) => {
                  switch (columns[columnId]?.title) {
                    case "id":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "name":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "position":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "office":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "salary":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "start_date":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "extn":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "status":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                    case "check":
                    case "actions":
                      return (
                        columns[columnId].disPlay === true && (
                          <ColumnActions
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        )
                      );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {_.size(tasks) === 0 && (
            <div className={st(classes.notFinData)}>
              We couldn't find any records.
            </div>
          )}
        </DragDropContext>
      </main>
    </div>
  );
};

export default Products;
