import ColumnPageType from "../ColumnPageType/";
import PaginatePage from "../PaginatePage";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { st, classes } from "./Products.st.css";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { sortColumnsOrder } from "../../store/magentoPageGridReducer";
import ViewLength from "../ViewLength";

const Products = () => {
  let data = useSelector((state: any) => state.magentopage);
  let columns = data.data.columns;
  let columnOrder = data.data.columnOrder;
  let tasks = data.data.tasks;
  // let tasksColumns;
  // _.map(columnOrder, (columnID) => {
  //   tasksColumns = columns[columnID];
  //   tasksColumns = tasks;
  // });
  const dispatch = useDispatch();
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder: any = Array.from(columnOrder);

      newColumnOrder.splice(source.index, 1);

      newColumnOrder.splice(destination.index, 0, draggableId);
      console.log(
        "🚀 ~ file: Products.tsx:36 ~ onDragEnd ~ newColumnOrder",
        newColumnOrder
      );
      dispatch(sortColumnsOrder(newColumnOrder));
    }
  };

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
            <div className={st(classes.actionBtnSelect)}>
              <button className={st(classes.actionSelect)}>Actions</button>
            </div>
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
                className={st(classes.pageColumns)}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div>check</div>
                {
                  // _.map(titleColumns, (titleColumn) =>
                  _.map(columnOrder, (columnId, index) => {
                    switch (columns[columnId].title) {
                      case "id":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "name":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "position":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "office":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "salary":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "start date":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "extn":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "status":
                        return (
                          <ColumnPageType
                            column={columns[columnId]}
                            index={index}
                            key={columnId}
                            typeColumn={columns[columnId].title}
                          />
                        );
                      case "option":
                      case "action":
                    }
                  })
                  // )
                }
                {provided.placeholder}
                <div>Action</div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
};

export default Products;
