import { Outlet } from "react-router";
import HeaderBar from "../components/HeaderBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col ">
        <HeaderBar/>
        <main className="flex-1 ">
            <Outlet/>
        </main>
    </div>
  )
}
