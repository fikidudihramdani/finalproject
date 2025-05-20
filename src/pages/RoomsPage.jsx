import RoomsContent from "@components/RoomsContent";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";

function RoomsPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
        <div className="fixed inset-y-0 left-0 bg-white shadow z-30">
            <Sidebar />
        </div>
        <div className="flex-1 ml-16 ">
            <div className="sticky top-0 z-20 bg-white shadow">
                <Header />
            </div>
      
      
      <main className="p-3">
        <RoomsContent />
      </main>
      </div>
    </div>
  );
}

export default RoomsPage;