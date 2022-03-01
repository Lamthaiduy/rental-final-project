import SideBar from "../components/sidebar";

function AdminContainer({children}) {
    return (
        <div className="flex h-screen">
            <SideBar />
            <main className="w-full">
                {children}
            </main>
        </div>
    )
}

export default AdminContainer;