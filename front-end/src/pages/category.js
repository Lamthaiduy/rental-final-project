import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllCategories,
  getOneCategory,
  deleteCategory,
} from "../apis";
import roles from "../constants/roles";
import { toast } from "react-toastify";
import CreateCategory from "../components/createNewCategory";
import EditCategory from "../components/editCategory";
function Category({ authReducer }) {
  const [categories, setCategories] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
const [bodySubmit, setBodySubmit] = useState({});
const [id, setId] = useState();
  const loadAllCategories = useCallback(
    async function () {
      const { data, status } = await getAllCategories(authReducer.token);
      if (status === 200) {
        setCategories(data.data);
      }
    },
    [authReducer.token]
  );

  const loadCate = async (id) => {
    const {data, status} = await getOneCategory(authReducer.token, id);
    if(status === 200) {
        setBodySubmit({name: data.data.name})
    }
}

  const handleEditOpen = (e, id) => {
      setId(id)
      loadCate(id);
      setEditOpen(true);
  }

  const handleDelete = async (e, id) => {
      const {data, status} = await deleteCategory(authReducer.token, id);
      if(status === 200) {
          loadAllCategories();
          toast.success(data.message)
      }
      else {
          toast.error(data.message)
      }
  }

  useEffect(() => {
    loadAllCategories();
  }, [loadAllCategories]);

  return (
    <>
    <EditCategory bodySubmit={bodySubmit} setBodySubmit={setBodySubmit} id={id} setId={id} open={editOpen} setOpen={setEditOpen} loadAllCategories={loadAllCategories} token={authReducer.token} />
      <CreateCategory
        open={createOpen}
        setOpen={setCreateOpen}
        loadAllCategories={loadAllCategories}
        token={authReducer.token}
      />
      <div className="w-full flex justify-center">
        <section className="bg-white py-20 lg:py-[120px]">
          <button
            onClick={() => setCreateOpen(true)}
            className="bg-blue-500 px-3 py-1 rounded-md text-white my-3"
          >
            Create
          </button>
          <div className="container">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="max-w-full max-h-[600px] overflow-y-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="bg-gray-500 text-center">
                        <th
                          className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             border-l border-transparent
                             "
                        >
                          Category Id
                        </th>
                        <th
                          className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             "
                        >
                          Category Name
                        </th>
                        <th
                          className="
                             w-fit
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             border-r border-transparent
                             "
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, index) => (
                        <tr key={index}>
                          <td
                            className="
                               text-center text-dark
                               font-medium
                               text-base
                               py-5
                               px-2
                               bg-[#F3F6FF]
                               border-b border-l border-[#E8E8E8]
                               "
                          >
                            {category._id}
                          </td>
                          <td
                            className="
                               text-center text-dark
                               font-medium
                               text-base
                               py-5
                               px-2
                               bg-white
                               border-b border-[#E8E8E8]
                               "
                          >
                            {category.name}
                          </td>
                          <td
                            className="
                          text-center text-dark
                          font-medium
                          text-base
                          py-5
                          px-2
                          flex gap-2
                          bg-[#F3F6FF]
                          border-b border-[#E8E8E8]
                               "
                          >
                            <button onClick={e => handleEditOpen(e, category._id)} className="bg-green-500 hover:bg-green-700 text-white px-5 py-3 rounded-md">
                              Edit
                            </button>
                            <button onClick={e => handleDelete(e, category._id)} className="bg-red-500 hover:bg-red-700 text-white px-5 py-3 rounded-md">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(Category);
