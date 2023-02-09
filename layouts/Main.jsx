import Topbar from "../components/Topbar";

export default function Main({children}) {
    return (
        <div className="min-h-screen">

            <Topbar />

            {children}
        </div>
    )
}